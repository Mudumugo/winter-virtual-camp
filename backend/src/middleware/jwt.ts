import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
  tenantId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

export const generateToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET || 'jwt-fallback-secret';
  return jwt.sign(payload, secret, { 
    expiresIn: '24h',
    issuer: 'winter-camp-api',
    audience: 'winter-camp-frontend'
  });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const secret = process.env.JWT_SECRET || 'jwt-fallback-secret';
    const decoded = jwt.verify(token, secret, {
      issuer: 'winter-camp-api',
      audience: 'winter-camp-frontend'
    }) as JWTPayload;
    return decoded;
  } catch (error) {
    logger.warn('JWT verification failed:', error);
    return null;
  }
};

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  req.user = payload;
  next();
};

export const optionalJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      req.user = payload;
    }
  }

  next();
};

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

export const refreshToken = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const newToken = generateToken(req.user);
    res.json({
      success: true,
      token: newToken,
      expiresIn: '24h'
    });
  } catch (error) {
    logger.error('Token refresh failed:', error);
    res.status(500).json({ error: 'Token refresh failed' });
  }
};