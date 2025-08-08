import { db } from './index';
import { users, camps, enrollments, resources } from './schema';
import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger';

const sampleUsers = [
  {
    email: 'admin@wintercamp.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    password: 'admin123'
  },
  {
    email: 'sarah.mitchell@wintercamp.com',
    firstName: 'Sarah',
    lastName: 'Mitchell',
    role: 'instructor',
    password: 'instructor123'
  },
  {
    email: 'jennifer.park@wintercamp.com',
    firstName: 'Jennifer',
    lastName: 'Park',
    role: 'instructor',
    password: 'instructor123'
  },
  {
    email: 'student@wintercamp.com',
    firstName: 'John',
    lastName: 'Student',
    role: 'student',
    password: 'student123'
  }
];

const sampleCamps = [
  {
    name: 'Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript and React',
    startDate: new Date('2024-07-15'),
    endDate: new Date('2024-07-26'),
    duration: '2 weeks',
    capacity: 25,
    enrolled: 22,
    status: 'upcoming',
    schedule: 'Mon-Fri, 9AM-3PM',
    location: 'Virtual',
    category: 'Programming',
    ageGroup: '13-17',
    price: 24900, // $249.00
    totalSessions: 10,
    completedSessions: 0
  },
  {
    name: 'Digital Literacy Bootcamp',
    description: 'Master essential computer skills for school and beyond',
    startDate: new Date('2024-07-08'),
    endDate: new Date('2024-07-19'),
    duration: '2 weeks',
    capacity: 20,
    enrolled: 18,
    status: 'active',
    schedule: 'Mon-Fri, 10AM-11:30AM',
    location: 'Virtual',
    category: 'Computer Skills',
    ageGroup: '9-12',
    price: 14900, // $149.00
    totalSessions: 8,
    completedSessions: 3
  },
  {
    name: 'Cyber Safety Heroes',
    description: 'Become a digital safety superhero',
    startDate: new Date('2024-07-22'),
    endDate: new Date('2024-07-26'),
    duration: '1 week',
    capacity: 12,
    enrolled: 8,
    status: 'upcoming',
    schedule: 'Mon-Fri, 11AM-12PM',
    location: 'Virtual',
    category: 'Digital Safety',
    ageGroup: '6-8',
    price: 9900, // $99.00
    totalSessions: 5,
    completedSessions: 0
  }
];

export async function seedDatabase() {
  try {
    logger.info('Starting database seeding...');

    const createdUsers = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const [user] = await db.insert(users).values({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role as 'admin' | 'instructor' | 'student',
        passwordHash: hashedPassword,
      }).returning();
      createdUsers.push(user);
      logger.info(`Created user: ${user.email}`);
    }

    const instructors = createdUsers.filter(u => u.role === 'instructor');
    const createdCamps = [];
    
    for (let i = 0; i < sampleCamps.length; i++) {
      const campData = sampleCamps[i];
      const instructor = instructors[i % instructors.length];
      
      const [camp] = await db.insert(camps).values({
        ...campData,
        instructorId: instructor.id,
      }).returning();
      createdCamps.push(camp);
      logger.info(`Created camp: ${camp.name}`);
    }

    const students = createdUsers.filter(u => u.role === 'student');
    if (students.length > 0 && createdCamps.length > 0) {
      const [enrollment] = await db.insert(enrollments).values({
        userId: students[0].id,
        campId: createdCamps[0].id,
        parentName: 'Jane Student',
        parentEmail: 'jane.parent@example.com',
        childName: 'John Student',
        childAge: 15,
        preferredFormat: 'live',
        newsletter: true,
      }).returning();
      logger.info(`Created enrollment for student: ${students[0].email}`);
    }

    for (const camp of createdCamps) {
      await db.insert(resources).values({
        campId: camp.id,
        title: `${camp.name} - Course Materials`,
        description: 'Essential materials and resources for this camp',
        resourceType: 'document',
        url: '/resources/sample-materials.pdf',
        isPublic: true,
      });
    }

    logger.info('Database seeding completed successfully');
  } catch (error) {
    logger.error('Database seeding failed:', error);
    throw error;
  }
}

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}
