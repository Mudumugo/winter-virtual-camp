import { Server } from 'socket.io';
import { logger } from '../utils/logger';

interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export function setupSocketIO(io: Server) {
  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on('join-camp', (campId: string) => {
      socket.join(`camp-${campId}`);
      logger.info(`Socket ${socket.id} joined camp-${campId}`);
    });

    socket.on('leave-camp', (campId: string) => {
      socket.leave(`camp-${campId}`);
      logger.info(`Socket ${socket.id} left camp-${campId}`);
    });

    socket.on('camp-message', (data: { campId: string; message: string; user: SessionUser }) => {
      socket.to(`camp-${data.campId}`).emit('new-message', {
        id: Date.now().toString(),
        content: data.message,
        sender: {
          id: data.user.id,
          name: `${data.user.firstName} ${data.user.lastName}`,
          role: data.user.role,
        },
        timestamp: new Date().toISOString(),
      });
    });

    socket.on('join-session', (sessionId: string) => {
      socket.join(`session-${sessionId}`);
      socket.to(`session-${sessionId}`).emit('user-joined', {
        socketId: socket.id,
        timestamp: new Date().toISOString(),
      });
      logger.info(`Socket ${socket.id} joined session-${sessionId}`);
    });

    socket.on('leave-session', (sessionId: string) => {
      socket.leave(`session-${sessionId}`);
      socket.to(`session-${sessionId}`).emit('user-left', {
        socketId: socket.id,
        timestamp: new Date().toISOString(),
      });
      logger.info(`Socket ${socket.id} left session-${sessionId}`);
    });

    socket.on('session-control', (data: { sessionId: string; action: string; payload?: any }) => {
      socket.to(`session-${data.sessionId}`).emit('session-update', {
        action: data.action,
        payload: data.payload,
        timestamp: new Date().toISOString(),
      });
      logger.info(`Session control: ${data.action} in session-${data.sessionId}`);
    });

    socket.on('start-screen-share', (sessionId: string) => {
      socket.to(`session-${sessionId}`).emit('screen-share-started', {
        userId: socket.id,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on('stop-screen-share', (sessionId: string) => {
      socket.to(`session-${sessionId}`).emit('screen-share-stopped', {
        userId: socket.id,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on('send-notification', (data: { userId: string; notification: any }) => {
      socket.to(`user-${data.userId}`).emit('notification', data.notification);
    });

    socket.on('join-user-room', (userId: string) => {
      socket.join(`user-${userId}`);
      logger.info(`Socket ${socket.id} joined user-${userId}`);
    });

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}
