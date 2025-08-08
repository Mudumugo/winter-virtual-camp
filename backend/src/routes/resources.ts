import { Router } from 'express';
import { db } from '../db';
import { resources, camps } from '../db/schema';
import { eq, and, ilike, desc } from 'drizzle-orm';
import { isAuthenticated, requireRole } from './auth';
import { validateRequest } from '../middleware/validation';
import { body, query } from 'express-validator';
import { logger } from '../utils/logger';

const router = Router();

router.get('/camp/:campId',
  isAuthenticated,
  async (req, res) => {
    try {
      const { campId } = req.params;

      const campResources = await db
        .select()
        .from(resources)
        .where(eq(resources.campId, campId))
        .orderBy(desc(resources.createdAt));

      res.json({ resources: campResources });
    } catch (error) {
      logger.error('Error fetching camp resources:', error);
      res.status(500).json({ error: 'Failed to fetch resources' });
    }
  }
);

router.get('/public',
  query('search').optional().isString(),
  query('type').optional().isString(),
  async (req, res) => {
    try {
      const { search, type } = req.query as {
        search?: string;
        type?: string;
      };

      let query = db
        .select()
        .from(resources);

      const conditions = [eq(resources.isPublic, true)];
      if (search) {
        conditions.push(ilike(resources.title, `%${search}%`));
      }
      if (type) {
        conditions.push(eq(resources.resourceType, type as string));
      }

      query = query.where(and(...conditions)) as any;

      const publicResources = await query.orderBy(desc(resources.createdAt));

      res.json({ resources: publicResources });
    } catch (error) {
      logger.error('Error fetching public resources:', error);
      res.status(500).json({ error: 'Failed to fetch public resources' });
    }
  }
);

router.post('/',
  isAuthenticated,
  requireRole(['admin', 'instructor']),
  validateRequest([
    body('campId').optional().isUUID().withMessage('Valid camp ID required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString(),
    body('resourceType').isIn(['document', 'video', 'link', 'interactive']).withMessage('Invalid resource type'),
    body('url').isURL().withMessage('Valid URL is required'),
    body('thumbnailUrl').optional().isURL().withMessage('Thumbnail must be a valid URL'),
    body('isPublic').optional().isBoolean().withMessage('isPublic must be boolean'),
  ]),
  async (req: any, res) => {
    try {
      const resourceData = req.body;

      if (req.session.user.role === 'instructor' && resourceData.campId) {
        const [camp] = await db
          .select()
          .from(camps)
          .where(and(
            eq(camps.id, resourceData.campId),
            eq(camps.instructorId, req.session.user.id)
          ))
          .limit(1);

        if (!camp) {
          return res.status(403).json({ error: 'Access denied to this camp' });
        }
      }

      const [newResource] = await db
        .insert(resources)
        .values(resourceData)
        .returning();

      logger.info(`Resource created: ${newResource.title} by ${req.session.user.email}`);

      res.status(201).json({
        success: true,
        resource: newResource,
      });
    } catch (error) {
      logger.error('Error creating resource:', error);
      res.status(500).json({ error: 'Failed to create resource' });
    }
  }
);

router.put('/:id',
  isAuthenticated,
  requireRole(['admin', 'instructor']),
  validateRequest([
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('resourceType').optional().isIn(['document', 'video', 'link', 'interactive']).withMessage('Invalid resource type'),
    body('url').optional().isURL().withMessage('Valid URL is required'),
    body('isPublic').optional().isBoolean().withMessage('isPublic must be boolean'),
  ]),
  async (req: any, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const [resource] = await db
        .select()
        .from(resources)
        .leftJoin(camps, eq(resources.campId, camps.id))
        .where(eq(resources.id, id))
        .limit(1);

      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }

      if (req.session.user.role === 'instructor' && resource.camps?.instructorId !== req.session.user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const [updatedResource] = await db
        .update(resources)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(resources.id, id))
        .returning();

      logger.info(`Resource updated: ${updatedResource.title} by ${req.session.user.email}`);

      res.json({
        success: true,
        resource: updatedResource,
      });
    } catch (error) {
      logger.error('Error updating resource:', error);
      res.status(500).json({ error: 'Failed to update resource' });
    }
  }
);

router.delete('/:id',
  isAuthenticated,
  requireRole(['admin', 'instructor']),
  async (req: any, res) => {
    try {
      const { id } = req.params;

      const [resource] = await db
        .select()
        .from(resources)
        .leftJoin(camps, eq(resources.campId, camps.id))
        .where(eq(resources.id, id))
        .limit(1);

      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }

      if (req.session.user.role === 'instructor' && resource.camps?.instructorId !== req.session.user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }

      await db
        .delete(resources)
        .where(eq(resources.id, id));

      logger.info(`Resource deleted: ${resource.resources.title} by ${req.session.user.email}`);

      res.json({
        success: true,
        message: 'Resource deleted successfully',
      });
    } catch (error) {
      logger.error('Error deleting resource:', error);
      res.status(500).json({ error: 'Failed to delete resource' });
    }
  }
);

router.post('/:id/access',
  isAuthenticated,
  async (req: any, res) => {
    try {
      const { id } = req.params;

      const [currentResource] = await db
        .select()
        .from(resources)
        .where(eq(resources.id, id))
        .limit(1);

      if (!currentResource) {
        return res.status(404).json({ error: 'Resource not found' });
      }

      const [updatedResource] = await db
        .update(resources)
        .set({
          downloadCount: (currentResource.downloadCount || 0) + 1,
        })
        .where(eq(resources.id, id))
        .returning();

      if (!updatedResource) {
        return res.status(404).json({ error: 'Resource not found' });
      }

      res.json({
        success: true,
        resource: updatedResource,
      });
    } catch (error) {
      logger.error('Error tracking resource access:', error);
      res.status(500).json({ error: 'Failed to track access' });
    }
  }
);

export const resourceRoutes = router;
