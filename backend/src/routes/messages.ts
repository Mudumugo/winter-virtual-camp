import { Router } from 'express';
import { db } from '../db';
import { messages, users, camps } from '../db/schema';
import { eq, and, or, desc } from 'drizzle-orm';
import { isAuthenticated } from './auth';
import { validateRequest } from '../middleware/validation';
import { body } from 'express-validator';
import { logger } from '../utils/logger';

const router = Router();

router.post('/',
  isAuthenticated,
  validateRequest([
    body('content').notEmpty().withMessage('Message content is required'),
    body('campId').optional().isUUID().withMessage('Valid camp ID required'),
    body('recipientId').optional().isUUID().withMessage('Valid recipient ID required'),
    body('messageType').optional().isIn(['text', 'announcement', 'system']).withMessage('Invalid message type'),
  ]),
  async (req: any, res) => {
    try {
      const { content, campId, recipientId, messageType = 'text' } = req.body;
      const senderId = req.session.user.id;

      if (!campId && !recipientId) {
        return res.status(400).json({ error: 'Either campId or recipientId is required' });
      }

      const [message] = await db
        .insert(messages)
        .values({
          senderId,
          campId: campId || null,
          recipientId: recipientId || null,
          content,
          messageType,
        })
        .returning();

      logger.info(`Message sent by ${req.session.user.email} to ${campId ? `camp ${campId}` : `user ${recipientId}`}`);

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      logger.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  }
);

router.get('/camp/:campId',
  isAuthenticated,
  async (req: any, res) => {
    try {
      const { campId } = req.params;

      const campMessages = await db
        .select({
          id: messages.id,
          content: messages.content,
          messageType: messages.messageType,
          createdAt: messages.createdAt,
          isRead: messages.isRead,
          sender: {
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            role: users.role,
          },
        })
        .from(messages)
        .innerJoin(users, eq(messages.senderId, users.id))
        .where(eq(messages.campId, campId))
        .orderBy(desc(messages.createdAt));

      res.json({ messages: campMessages });
    } catch (error) {
      logger.error('Error fetching camp messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }
);

router.get('/direct/:userId',
  isAuthenticated,
  async (req: any, res) => {
    try {
      const { userId } = req.params;
      const currentUserId = req.session.user.id;

      const directMessages = await db
        .select({
          id: messages.id,
          content: messages.content,
          messageType: messages.messageType,
          createdAt: messages.createdAt,
          isRead: messages.isRead,
          sender: {
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            role: users.role,
          },
        })
        .from(messages)
        .innerJoin(users, eq(messages.senderId, users.id))
        .where(
          and(
            eq(messages.campId, null as any),
            or(
              and(eq(messages.senderId, currentUserId), eq(messages.recipientId, userId)),
              and(eq(messages.senderId, userId), eq(messages.recipientId, currentUserId))
            )
          )
        )
        .orderBy(desc(messages.createdAt));

      res.json({ messages: directMessages });
    } catch (error) {
      logger.error('Error fetching direct messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }
);

router.put('/:messageId/read',
  isAuthenticated,
  async (req: any, res) => {
    try {
      const { messageId } = req.params;
      const userId = req.session.user.id;

      const [updatedMessage] = await db
        .update(messages)
        .set({ isRead: true })
        .where(
          and(
            eq(messages.id, messageId),
            or(
              eq(messages.recipientId, userId),
              eq(messages.senderId, userId)
            )
          )
        )
        .returning();

      if (!updatedMessage) {
        return res.status(404).json({ error: 'Message not found' });
      }

      res.json({
        success: true,
        message: 'Message marked as read',
      });
    } catch (error) {
      logger.error('Error marking message as read:', error);
      res.status(500).json({ error: 'Failed to mark message as read' });
    }
  }
);

router.get('/unread/count',
  isAuthenticated,
  async (req: any, res) => {
    try {
      const userId = req.session.user.id;

      const [{ count: unreadCount }] = await db
        .select({ count: messages.id })
        .from(messages)
        .where(
          and(
            eq(messages.recipientId, userId),
            eq(messages.isRead, false)
          )
        );

      res.json({ unreadCount: Number(unreadCount) });
    } catch (error) {
      logger.error('Error fetching unread count:', error);
      res.status(500).json({ error: 'Failed to fetch unread count' });
    }
  }
);

export const messageRoutes = router;
