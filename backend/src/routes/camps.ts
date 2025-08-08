import { Router } from 'express';
import { db } from '../db';
import { camps, users, enrollments } from '../db/schema';
import { eq, and, ilike, desc, asc, count } from 'drizzle-orm';
import { isAuthenticated, requireRole } from './auth';
import { validateRequest } from '../middleware/validation';
import { body, query } from 'express-validator';
import { logger } from '../utils/logger';

const router = Router();

router.get('/', 
  query('category').optional().isString(),
  query('ageGroup').optional().isString(),
  query('status').optional().isIn(['upcoming', 'active', 'completed']),
  query('search').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  async (req, res) => {
    try {
      const { category, ageGroup, status, search, page = 1, limit = 20 } = req.query as {
        category?: string;
        ageGroup?: string;
        status?: string;
        search?: string;
        page?: string;
        limit?: string;
      };
      const offset = (Number(page) - 1) * Number(limit);

      let query = db
        .select({
          id: camps.id,
          name: camps.name,
          description: camps.description,
          instructorId: camps.instructorId,
          instructorName: users.firstName,
          instructorLastName: users.lastName,
          startDate: camps.startDate,
          endDate: camps.endDate,
          duration: camps.duration,
          capacity: camps.capacity,
          enrolled: camps.enrolled,
          status: camps.status,
          schedule: camps.schedule,
          location: camps.location,
          category: camps.category,
          ageGroup: camps.ageGroup,
          price: camps.price,
          totalSessions: camps.totalSessions,
          completedSessions: camps.completedSessions,
          createdAt: camps.createdAt,
        })
        .from(camps)
        .leftJoin(users, eq(camps.instructorId, users.id));

      const conditions: any[] = [];
      if (category) conditions.push(eq(camps.category, category));
      if (ageGroup) conditions.push(eq(camps.ageGroup, ageGroup));
      if (status) conditions.push(eq(camps.status, status));
      if (search) {
        conditions.push(
          ilike(camps.name, `%${search}%`)
        );
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as any;
      }

      const result = await query
        .orderBy(desc(camps.createdAt))
        .limit(Number(limit))
        .offset(offset);

      const [{ total }] = await db
        .select({ total: count() })
        .from(camps)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      res.json({
        camps: result.map(camp => ({
          ...camp,
          instructor: camp.instructorName ? `${camp.instructorName} ${camp.instructorLastName}` : null,
        })),
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: Number(total),
          pages: Math.ceil(Number(total) / Number(limit)),
        },
      });
    } catch (error) {
      logger.error('Error fetching camps:', error);
      res.status(500).json({ error: 'Failed to fetch camps' });
    }
  }
);

router.get('/:id', async (req, res) => {
  try {
    const [camp] = await db
      .select({
        id: camps.id,
        name: camps.name,
        description: camps.description,
        instructorId: camps.instructorId,
        instructorName: users.firstName,
        instructorLastName: users.lastName,
        instructorEmail: users.email,
        startDate: camps.startDate,
        endDate: camps.endDate,
        duration: camps.duration,
        capacity: camps.capacity,
        enrolled: camps.enrolled,
        status: camps.status,
        schedule: camps.schedule,
        location: camps.location,
        category: camps.category,
        ageGroup: camps.ageGroup,
        price: camps.price,
        meetingLink: camps.meetingLink,
        totalSessions: camps.totalSessions,
        completedSessions: camps.completedSessions,
        createdAt: camps.createdAt,
        updatedAt: camps.updatedAt,
      })
      .from(camps)
      .leftJoin(users, eq(camps.instructorId, users.id))
      .where(eq(camps.id, req.params.id))
      .limit(1);

    if (!camp) {
      return res.status(404).json({ error: 'Camp not found' });
    }

    res.json({
      ...camp,
      instructor: camp.instructorName ? {
        id: camp.instructorId,
        name: `${camp.instructorName} ${camp.instructorLastName}`,
        email: camp.instructorEmail,
      } : null,
    });
  } catch (error) {
    logger.error('Error fetching camp:', error);
    res.status(500).json({ error: 'Failed to fetch camp' });
  }
});

router.post('/',
  isAuthenticated,
  requireRole(['admin']),
  validateRequest([
    body('name').notEmpty().withMessage('Camp name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('instructorId').isUUID().withMessage('Valid instructor ID is required'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('endDate').isISO8601().withMessage('Valid end date is required'),
    body('duration').notEmpty().withMessage('Duration is required'),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
    body('schedule').notEmpty().withMessage('Schedule is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('ageGroup').notEmpty().withMessage('Age group is required'),
    body('price').optional().isInt({ min: 0 }).withMessage('Price must be non-negative'),
  ]),
  async (req: any, res) => {
    try {
      const campData = req.body;

      const [instructor] = await db
        .select()
        .from(users)
        .where(and(
          eq(users.id, campData.instructorId),
          eq(users.role, 'instructor')
        ))
        .limit(1);

      if (!instructor) {
        return res.status(400).json({ error: 'Invalid instructor ID' });
      }

      const [newCamp] = await db
        .insert(camps)
        .values({
          ...campData,
          startDate: new Date(campData.startDate),
          endDate: new Date(campData.endDate),
          enrolled: 0,
          completedSessions: 0,
        })
        .returning();

      logger.info(`Camp created: ${newCamp.name} by admin ${req.session.user.email}`);

      res.status(201).json({
        success: true,
        camp: newCamp,
        message: 'Camp created successfully',
      });
    } catch (error) {
      logger.error('Error creating camp:', error);
      res.status(500).json({ error: 'Failed to create camp' });
    }
  }
);

router.put('/:id',
  isAuthenticated,
  requireRole(['admin']),
  validateRequest([
    body('name').optional().notEmpty().withMessage('Camp name cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('instructorId').optional().isUUID().withMessage('Valid instructor ID is required'),
    body('startDate').optional().isISO8601().withMessage('Valid start date is required'),
    body('endDate').optional().isISO8601().withMessage('Valid end date is required'),
    body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
    body('price').optional().isInt({ min: 0 }).withMessage('Price must be non-negative'),
  ]),
  async (req: any, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (updateData.instructorId) {
        const [instructor] = await db
          .select()
          .from(users)
          .where(and(
            eq(users.id, updateData.instructorId),
            eq(users.role, 'instructor')
          ))
          .limit(1);

        if (!instructor) {
          return res.status(400).json({ error: 'Invalid instructor ID' });
        }
      }

      if (updateData.startDate) updateData.startDate = new Date(updateData.startDate);
      if (updateData.endDate) updateData.endDate = new Date(updateData.endDate);

      const [updatedCamp] = await db
        .update(camps)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(camps.id, id))
        .returning();

      if (!updatedCamp) {
        return res.status(404).json({ error: 'Camp not found' });
      }

      logger.info(`Camp updated: ${updatedCamp.name} by admin ${req.session.user.email}`);

      res.json({
        success: true,
        camp: updatedCamp,
        message: 'Camp updated successfully',
      });
    } catch (error) {
      logger.error('Error updating camp:', error);
      res.status(500).json({ error: 'Failed to update camp' });
    }
  }
);

router.delete('/:id',
  isAuthenticated,
  requireRole(['admin']),
  async (req: any, res) => {
    try {
      const { id } = req.params;

      const [enrollment] = await db
        .select()
        .from(enrollments)
        .where(eq(enrollments.campId, id))
        .limit(1);

      if (enrollment) {
        return res.status(400).json({ 
          error: 'Cannot delete camp with existing enrollments' 
        });
      }

      const [deletedCamp] = await db
        .delete(camps)
        .where(eq(camps.id, id))
        .returning();

      if (!deletedCamp) {
        return res.status(404).json({ error: 'Camp not found' });
      }

      logger.info(`Camp deleted: ${deletedCamp.name} by admin ${req.session.user.email}`);

      res.json({
        success: true,
        message: 'Camp deleted successfully',
      });
    } catch (error) {
      logger.error('Error deleting camp:', error);
      res.status(500).json({ error: 'Failed to delete camp' });
    }
  }
);

router.get('/instructor/my-camps',
  isAuthenticated,
  requireRole(['instructor']),
  async (req: any, res) => {
    try {
      const instructorId = req.session.user.id;

      const instructorCamps = await db
        .select()
        .from(camps)
        .where(eq(camps.instructorId, instructorId))
        .orderBy(desc(camps.createdAt));

      res.json({
        camps: instructorCamps,
      });
    } catch (error) {
      logger.error('Error fetching instructor camps:', error);
      res.status(500).json({ error: 'Failed to fetch instructor camps' });
    }
  }
);

export const campRoutes = router;
