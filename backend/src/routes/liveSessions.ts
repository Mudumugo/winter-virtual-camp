import { Router } from 'express';
import { db } from '../db';
import { liveSessions, camps } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { isAuthenticated, requireRole } from './auth';
import { validateRequest } from '../middleware/validation';
import { body } from 'express-validator';
import { logger } from '../utils/logger';

const router = Router();

router.post('/',
  isAuthenticated,
  requireRole(['instructor']),
  validateRequest([
    body('campId').isUUID().withMessage('Valid camp ID is required'),
    body('title').notEmpty().withMessage('Session title is required'),
    body('description').optional().isString(),
    body('startTime').isISO8601().withMessage('Valid start time is required'),
    body('meetingLink').optional().isURL().withMessage('Meeting link must be valid URL'),
  ]),
  async (req: any, res) => {
    try {
      const { campId, title, description, startTime, meetingLink } = req.body;
      const instructorId = req.session.user.id;

      const [camp] = await db
        .select()
        .from(camps)
        .where(and(
          eq(camps.id, campId),
          eq(camps.instructorId, instructorId)
        ))
        .limit(1);

      if (!camp) {
        return res.status(403).json({ error: 'Access denied to this camp' });
      }

      const [session] = await db
        .insert(liveSessions)
        .values({
          campId,
          instructorId,
          title,
          description,
          startTime: new Date(startTime),
          meetingLink,
          attendees: [],
        })
        .returning();

      logger.info(`Live session created: ${session.title} by ${req.session.user.email}`);

      res.status(201).json({
        success: true,
        session,
      });
    } catch (error) {
      logger.error('Error creating live session:', error);
      res.status(500).json({ error: 'Failed to create live session' });
    }
  }
);

router.get('/camp/:campId',
  isAuthenticated,
  async (req, res) => {
    try {
      const { campId } = req.params;

      const sessions = await db
        .select()
        .from(liveSessions)
        .where(eq(liveSessions.campId, campId))
        .orderBy(desc(liveSessions.startTime));

      res.json({ sessions });
    } catch (error) {
      logger.error('Error fetching camp sessions:', error);
      res.status(500).json({ error: 'Failed to fetch sessions' });
    }
  }
);

router.post('/:id/start',
  isAuthenticated,
  requireRole(['instructor']),
  async (req: any, res) => {
    try {
      const { id } = req.params;
      const instructorId = req.session.user.id;

      const [session] = await db
        .select()
        .from(liveSessions)
        .where(and(
          eq(liveSessions.id, id),
          eq(liveSessions.instructorId, instructorId)
        ))
        .limit(1);

      if (!session) {
        return res.status(403).json({ error: 'Session not found or access denied' });
      }

      if (session.status === 'active') {
        return res.status(400).json({ error: 'Session is already active' });
      }

      const [updatedSession] = await db
        .update(liveSessions)
        .set({
          status: 'active',
          startTime: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(liveSessions.id, id))
        .returning();

      logger.info(`Live session started: ${updatedSession.title} by ${req.session.user.email}`);

      res.json({
        success: true,
        session: updatedSession,
      });
    } catch (error) {
      logger.error('Error starting session:', error);
      res.status(500).json({ error: 'Failed to start session' });
    }
  }
);

router.post('/:id/end',
  isAuthenticated,
  requireRole(['instructor']),
  validateRequest([
    body('recordingUrl').optional().isURL().withMessage('Recording URL must be valid'),
  ]),
  async (req: any, res) => {
    try {
      const { id } = req.params;
      const { recordingUrl } = req.body;
      const instructorId = req.session.user.id;

      const [session] = await db
        .select()
        .from(liveSessions)
        .where(and(
          eq(liveSessions.id, id),
          eq(liveSessions.instructorId, instructorId)
        ))
        .limit(1);

      if (!session) {
        return res.status(403).json({ error: 'Session not found or access denied' });
      }

      const [updatedSession] = await db
        .update(liveSessions)
        .set({
          status: 'completed',
          endTime: new Date(),
          recordingUrl,
          updatedAt: new Date(),
        })
        .where(eq(liveSessions.id, id))
        .returning();

      logger.info(`Live session ended: ${updatedSession.title} by ${req.session.user.email}`);

      res.json({
        success: true,
        session: updatedSession,
      });
    } catch (error) {
      logger.error('Error ending session:', error);
      res.status(500).json({ error: 'Failed to end session' });
    }
  }
);

router.post('/:id/join',
  isAuthenticated,
  async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.session.user.id;

      const [session] = await db
        .select()
        .from(liveSessions)
        .where(eq(liveSessions.id, id))
        .limit(1);

      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      if (session.status !== 'active') {
        return res.status(400).json({ error: 'Session is not active' });
      }

      const attendees = (session.attendees as string[]) || [];
      if (!attendees.includes(userId)) {
        attendees.push(userId);

        await db
          .update(liveSessions)
          .set({
            attendees,
            updatedAt: new Date(),
          })
          .where(eq(liveSessions.id, id));
      }

      logger.info(`User ${req.session.user.email} joined session: ${session.title}`);

      res.json({
        success: true,
        session: {
          ...session,
          attendees,
        },
      });
    } catch (error) {
      logger.error('Error joining session:', error);
      res.status(500).json({ error: 'Failed to join session' });
    }
  }
);

router.get('/instructor/my-sessions',
  isAuthenticated,
  requireRole(['instructor']),
  async (req: any, res) => {
    try {
      const instructorId = req.session.user.id;

      const sessions = await db
        .select({
          id: liveSessions.id,
          title: liveSessions.title,
          description: liveSessions.description,
          startTime: liveSessions.startTime,
          endTime: liveSessions.endTime,
          status: liveSessions.status,
          attendees: liveSessions.attendees,
          campName: camps.name,
          campId: camps.id,
        })
        .from(liveSessions)
        .innerJoin(camps, eq(liveSessions.campId, camps.id))
        .where(eq(liveSessions.instructorId, instructorId))
        .orderBy(desc(liveSessions.startTime));

      res.json({ sessions });
    } catch (error) {
      logger.error('Error fetching instructor sessions:', error);
      res.status(500).json({ error: 'Failed to fetch sessions' });
    }
  }
);

export const liveSessionRoutes = router;
