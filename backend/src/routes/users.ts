import { Router } from 'express';
import { db } from '../db';
import { users, enrollments, camps } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { isAuthenticated, requireRole } from './auth';
import { validateRequest } from '../middleware/validation';
import { body } from 'express-validator';
import { logger } from '../utils/logger';

const router = Router();

router.get('/',
  isAuthenticated,
  requireRole(['admin']),
  async (req, res) => {
    try {
      const allUsers = await db
        .select({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          role: users.role,
          isActive: users.isActive,
          createdAt: users.createdAt,
        })
        .from(users)
        .orderBy(desc(users.createdAt));

      res.json({ users: allUsers });
    } catch (error) {
      logger.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }
);

router.get('/profile',
  isAuthenticated,
  async (req: any, res) => {
    try {
      const userId = req.session.user.id;

      const [user] = await db
        .select({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          role: users.role,
          profileImageUrl: users.profileImageUrl,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let userEnrollments: any[] = [];
      if (user.role === 'student') {
        userEnrollments = await db
          .select({
            enrollmentId: enrollments.id,
            campId: camps.id,
            campName: camps.name,
            campDescription: camps.description,
            campStatus: camps.status,
            startDate: camps.startDate,
            endDate: camps.endDate,
            enrolledAt: enrollments.enrolledAt,
            status: enrollments.status,
          })
          .from(enrollments)
          .innerJoin(camps, eq(enrollments.campId, camps.id))
          .where(eq(enrollments.userId, userId))
          .orderBy(desc(enrollments.enrolledAt));
      }

      res.json({
        user,
        enrollments: userEnrollments,
      });
    } catch (error) {
      logger.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  }
);

router.put('/profile',
  isAuthenticated,
  validateRequest([
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
    body('profileImageUrl').optional().isURL().withMessage('Profile image must be a valid URL'),
  ]),
  async (req: any, res) => {
    try {
      const userId = req.session.user.id;
      const updateData = req.body;

      const [updatedUser] = await db
        .update(users)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId))
        .returning({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          role: users.role,
          profileImageUrl: users.profileImageUrl,
        });

      req.session.user = {
        ...req.session.user,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        profileImageUrl: updatedUser.profileImageUrl,
      };

      logger.info(`Profile updated for user: ${updatedUser.email}`);

      res.json({
        success: true,
        user: updatedUser,
        message: 'Profile updated successfully',
      });
    } catch (error) {
      logger.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }
);

router.get('/instructors',
  isAuthenticated,
  requireRole(['admin']),
  async (req, res) => {
    try {
      const instructors = await db
        .select({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          isActive: users.isActive,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.role, 'instructor'))
        .orderBy(users.firstName);

      res.json({ instructors });
    } catch (error) {
      logger.error('Error fetching instructors:', error);
      res.status(500).json({ error: 'Failed to fetch instructors' });
    }
  }
);

router.get('/camp/:campId/students',
  isAuthenticated,
  requireRole(['admin', 'instructor']),
  async (req: any, res) => {
    try {
      const { campId } = req.params;

      if (req.session.user.role === 'instructor') {
        const [camp] = await db
          .select()
          .from(camps)
          .where(and(
            eq(camps.id, campId),
            eq(camps.instructorId, req.session.user.id)
          ))
          .limit(1);

        if (!camp) {
          return res.status(403).json({ error: 'Access denied to this camp' });
        }
      }

      const students = await db
        .select({
          userId: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          enrollmentId: enrollments.id,
          childName: enrollments.childName,
          childAge: enrollments.childAge,
          parentName: enrollments.parentName,
          parentEmail: enrollments.parentEmail,
          enrolledAt: enrollments.enrolledAt,
          status: enrollments.status,
        })
        .from(enrollments)
        .innerJoin(users, eq(enrollments.userId, users.id))
        .where(eq(enrollments.campId, campId))
        .orderBy(enrollments.enrolledAt);

      res.json({ students });
    } catch (error) {
      logger.error('Error fetching camp students:', error);
      res.status(500).json({ error: 'Failed to fetch camp students' });
    }
  }
);

export const userRoutes = router;
