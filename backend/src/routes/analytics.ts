import { Router } from 'express';
import { db } from '../db';
import { camps, users, enrollments, messages, liveSessions } from '../db/schema';
import { eq, and, count, desc, gte } from 'drizzle-orm';
import { isAuthenticated, requireRole } from './auth';
import { logger } from '../utils/logger';

const router = Router();

router.get('/dashboard',
  isAuthenticated,
  requireRole(['admin']),
  async (req, res) => {
    try {
      const [totalCamps] = await db.select({ count: count() }).from(camps);
      const [totalUsers] = await db.select({ count: count() }).from(users);
      const [totalEnrollments] = await db.select({ count: count() }).from(enrollments);
      const [totalInstructors] = await db.select({ count: count() }).from(users).where(eq(users.role, 'instructor'));

      const [activeCamps] = await db.select({ count: count() }).from(camps).where(eq(camps.status, 'active'));

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const [recentEnrollments] = await db
        .select({ count: count() })
        .from(enrollments)
        .where(gte(enrollments.enrolledAt, thirtyDaysAgo));

      const campStats = await db
        .select({
          campId: camps.id,
          campName: camps.name,
          capacity: camps.capacity,
          enrolled: camps.enrolled,
          status: camps.status,
        })
        .from(camps)
        .orderBy(desc(camps.enrolled));

      const enrollmentTrends = await db
        .select({
          month: enrollments.enrolledAt,
          count: count(),
        })
        .from(enrollments)
        .groupBy(enrollments.enrolledAt)
        .orderBy(desc(enrollments.enrolledAt))
        .limit(12);

      res.json({
        overview: {
          totalCamps: Number(totalCamps.count),
          totalUsers: Number(totalUsers.count),
          totalEnrollments: Number(totalEnrollments.count),
          totalInstructors: Number(totalInstructors.count),
          activeCamps: Number(activeCamps.count),
          recentEnrollments: Number(recentEnrollments.count),
        },
        campStats,
        enrollmentTrends,
      });
    } catch (error) {
      logger.error('Error fetching dashboard analytics:', error);
      res.status(500).json({ error: 'Failed to fetch analytics' });
    }
  }
);

router.get('/instructor',
  isAuthenticated,
  requireRole(['instructor']),
  async (req: any, res) => {
    try {
      const instructorId = req.session.user.id;

      const instructorCamps = await db
        .select({
          id: camps.id,
          name: camps.name,
          enrolled: camps.enrolled,
          capacity: camps.capacity,
          status: camps.status,
          totalSessions: camps.totalSessions,
          completedSessions: camps.completedSessions,
        })
        .from(camps)
        .where(eq(camps.instructorId, instructorId));

      const totalStudents = instructorCamps.reduce((sum, camp) => sum + (camp.enrolled || 0), 0);

      const campIds = instructorCamps.map(camp => camp.id);
      const [recentMessages] = await db
        .select({ count: count() })
        .from(messages)
        .where(eq(messages.senderId, instructorId));

      const [totalSessions] = await db
        .select({ count: count() })
        .from(liveSessions)
        .where(eq(liveSessions.instructorId, instructorId));

      const [completedSessions] = await db
        .select({ count: count() })
        .from(liveSessions)
        .where(and(
          eq(liveSessions.instructorId, instructorId),
          eq(liveSessions.status, 'completed')
        ));

      res.json({
        overview: {
          totalCamps: instructorCamps.length,
          totalStudents,
          activeCamps: instructorCamps.filter(c => c.status === 'active').length,
          totalSessions: Number(totalSessions.count),
          completedSessions: Number(completedSessions.count),
          messagesSent: Number(recentMessages.count),
        },
        camps: instructorCamps,
      });
    } catch (error) {
      logger.error('Error fetching instructor analytics:', error);
      res.status(500).json({ error: 'Failed to fetch instructor analytics' });
    }
  }
);

router.get('/student',
  isAuthenticated,
  requireRole(['student']),
  async (req: any, res) => {
    try {
      const studentId = req.session.user.id;

      const studentEnrollments = await db
        .select({
          enrollmentId: enrollments.id,
          campId: camps.id,
          campName: camps.name,
          campStatus: camps.status,
          enrolledAt: enrollments.enrolledAt,
          status: enrollments.status,
          totalSessions: camps.totalSessions,
          completedSessions: camps.completedSessions,
        })
        .from(enrollments)
        .innerJoin(camps, eq(enrollments.campId, camps.id))
        .where(eq(enrollments.userId, studentId));

      const [messagesReceived] = await db
        .select({ count: count() })
        .from(messages)
        .where(eq(messages.recipientId, studentId));

      const campIds = studentEnrollments.map(e => e.campId);
      const [sessionsAttended] = await db
        .select({ count: count() })
        .from(liveSessions)
        .where(eq(liveSessions.status, 'completed'));

      res.json({
        overview: {
          totalEnrollments: studentEnrollments.length,
          activeCamps: studentEnrollments.filter(e => e.campStatus === 'active').length,
          completedCamps: studentEnrollments.filter(e => e.campStatus === 'completed').length,
          messagesReceived: Number(messagesReceived.count),
          sessionsAttended: Number(sessionsAttended.count),
        },
        enrollments: studentEnrollments,
      });
    } catch (error) {
      logger.error('Error fetching student analytics:', error);
      res.status(500).json({ error: 'Failed to fetch student analytics' });
    }
  }
);

export const analyticsRoutes = router;
