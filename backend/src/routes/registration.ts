import { Router } from 'express';
import { db } from '../db';
import { enrollments, camps, users } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { validateRequest } from '../middleware/validation';
import { body } from 'express-validator';
import { logger } from '../utils/logger';

const router = Router();

router.post('/submit',
  validateRequest([
    body('parentName').notEmpty().withMessage('Parent name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('childName').notEmpty().withMessage('Child name is required'),
    body('age').isInt({ min: 6, max: 18 }).withMessage('Age must be between 6 and 18'),
    body('preferredCamp').notEmpty().withMessage('Preferred camp is required'),
    body('format').isIn(['live', 'self-paced', 'hybrid']).withMessage('Invalid format'),
    body('newsletter').isBoolean().withMessage('Newsletter preference must be boolean'),
  ]),
  async (req, res) => {
    try {
      const {
        parentName,
        email,
        childName,
        age,
        preferredCamp,
        format,
        newsletter
      } = req.body;

      const [camp] = await db
        .select()
        .from(camps)
        .where(eq(camps.name, preferredCamp))
        .limit(1);

      if (!camp) {
        return res.status(404).json({ error: 'Camp not found' });
      }

      if ((camp.enrolled || 0) >= camp.capacity) {
        return res.status(400).json({ error: 'Camp is full' });
      }

      if (camp.status === 'completed') {
        return res.status(400).json({ error: 'Camp has already completed' });
      }

      let [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user) {
        [user] = await db
          .insert(users)
          .values({
            email,
            firstName: childName.split(' ')[0] || childName,
            lastName: childName.split(' ').slice(1).join(' ') || '',
            role: 'student',
          })
          .returning();
      }

      const [existingEnrollment] = await db
        .select()
        .from(enrollments)
        .where(and(
          eq(enrollments.userId, user.id),
          eq(enrollments.campId, camp.id)
        ))
        .limit(1);

      if (existingEnrollment) {
        return res.status(409).json({ error: 'Already enrolled in this camp' });
      }

      const [enrollment] = await db
        .insert(enrollments)
        .values({
          userId: user.id,
          campId: camp.id,
          parentName,
          parentEmail: email,
          childName,
          childAge: age,
          preferredFormat: format,
          newsletter,
        })
        .returning();

      await db
        .update(camps)
        .set({
          enrolled: (camp.enrolled || 0) + 1,
          updatedAt: new Date(),
        })
        .where(eq(camps.id, camp.id));

      logger.info(`New enrollment: ${childName} enrolled in ${camp.name}`);

      res.status(201).json({
        success: true,
        enrollment: {
          id: enrollment.id,
          campName: camp.name,
          childName,
          parentName,
          enrolledAt: enrollment.enrolledAt,
        },
        message: 'Registration submitted successfully! We will contact you within 24 hours.',
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
);

router.get('/camps', async (req, res) => {
  try {
    const availableCamps = await db
      .select({
        id: camps.id,
        name: camps.name,
        description: camps.description,
        category: camps.category,
        ageGroup: camps.ageGroup,
        duration: camps.duration,
        schedule: camps.schedule,
        price: camps.price,
        capacity: camps.capacity,
        enrolled: camps.enrolled,
        startDate: camps.startDate,
        endDate: camps.endDate,
      })
      .from(camps)
      .where(eq(camps.status, 'upcoming'));

    const campsWithAvailability = availableCamps.map(camp => ({
      ...camp,
      available: camp.capacity - (camp.enrolled || 0),
      isFull: (camp.enrolled || 0) >= camp.capacity,
    }));

    res.json({
      camps: campsWithAvailability,
    });
  } catch (error) {
    logger.error('Error fetching available camps:', error);
    res.status(500).json({ error: 'Failed to fetch available camps' });
  }
});

router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const userEnrollments = await db
      .select({
        enrollmentId: enrollments.id,
        campName: camps.name,
        campId: camps.id,
        childName: enrollments.childName,
        status: enrollments.status,
        enrolledAt: enrollments.enrolledAt,
        campStartDate: camps.startDate,
        campEndDate: camps.endDate,
        campStatus: camps.status,
      })
      .from(enrollments)
      .innerJoin(users, eq(enrollments.userId, users.id))
      .innerJoin(camps, eq(enrollments.campId, camps.id))
      .where(eq(users.email, email));

    res.json({
      enrollments: userEnrollments,
    });
  } catch (error) {
    logger.error('Error fetching enrollment status:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment status' });
  }
});

export const registrationRoutes = router;
