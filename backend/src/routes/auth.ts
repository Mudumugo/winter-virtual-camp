import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { validateRequest } from '../middleware/validation';
import { body } from 'express-validator';
import { logger } from '../utils/logger';

const router = Router();

export const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: 'Authentication required' });
};

export const requireRole = (roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!req.session?.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!roles.includes(req.session.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    return next();
  };
};

router.get('/session', (req: any, res) => {
  if (req.session && req.session.user) {
    res.json({
      authenticated: true,
      user: {
        id: req.session.user.id,
        email: req.session.user.email,
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        role: req.session.user.role,
        profileImageUrl: req.session.user.profileImageUrl,
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

router.post('/demo-login', 
  validateRequest([
    body('role').isIn(['admin', 'instructor', 'student']).withMessage('Invalid role'),
  ]),
  async (req: any, res) => {
    try {
      const { role } = req.body;
      
      const [demoUser] = await db
        .select()
        .from(users)
        .where(eq(users.role, role))
        .limit(1);

      if (!demoUser) {
        return res.status(404).json({ error: 'Demo user not found for this role' });
      }

      req.session.user = {
        id: demoUser.id,
        email: demoUser.email,
        firstName: demoUser.firstName,
        lastName: demoUser.lastName,
        role: demoUser.role,
        profileImageUrl: demoUser.profileImageUrl,
        tenantId: demoUser.tenantId,
      };

      logger.info(`Demo login successful for role: ${role}`);

      res.json({
        success: true,
        user: req.session.user,
        message: `Logged in as demo ${role}`,
      });
    } catch (error) {
      logger.error('Demo login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
);

router.post('/login',
  validateRequest([
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ]),
  async (req: any, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user || !user.passwordHash) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      if (!user.isActive) {
        return res.status(401).json({ error: 'Account is deactivated' });
      }

      req.session.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
        tenantId: user.tenantId,
      };

      logger.info(`Login successful for user: ${user.email}`);

      res.json({
        success: true,
        user: req.session.user,
        message: 'Login successful',
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
);

router.post('/register',
  validateRequest([
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('role').optional().isIn(['student', 'instructor']).withMessage('Invalid role'),
  ]),
  async (req: any, res) => {
    try {
      const { email, password, firstName, lastName, role = 'student' } = req.body;

      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const [newUser] = await db
        .insert(users)
        .values({
          email,
          firstName,
          lastName,
          role: role as 'student' | 'instructor',
          passwordHash,
        })
        .returning();

      logger.info(`User registered: ${newUser.email}`);

      res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
        },
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
);

router.post('/logout', (req: any, res) => {
  if (req.session) {
    const userEmail = req.session.user?.email;
    req.session.destroy((err: any) => {
      if (err) {
        logger.error('Logout error:', err);
        return res.status(500).json({ error: 'Logout failed' });
      }
      
      logger.info(`User logged out: ${userEmail}`);
      res.json({ success: true, message: 'Logout successful' });
    });
  } else {
    res.json({ success: true, message: 'No active session' });
  }
});

export const authRoutes = router;
