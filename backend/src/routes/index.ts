import { Express } from 'express';
import { authRoutes } from './auth';
import { campRoutes } from './camps';
import { registrationRoutes } from './registration';
import { userRoutes } from './users';
import { messageRoutes } from './messages';
import { resourceRoutes } from './resources';
import { liveSessionRoutes } from './liveSessions';
import { uploadRoutes } from './upload';
import { analyticsRoutes } from './analytics';

export function setupRoutes(app: Express) {
  app.use('/api/auth', authRoutes);
  app.use('/api/camps', campRoutes);
  app.use('/api/registration', registrationRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/resources', resourceRoutes);
  app.use('/api/sessions', liveSessionRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/analytics', analyticsRoutes);

  app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });
}
