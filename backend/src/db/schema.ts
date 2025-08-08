import { pgTable, text, integer, timestamp, boolean, uuid, varchar, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  passwordHash: text('password_hash'),
  role: varchar('role', { length: 20 }).notNull().default('student'), // admin, instructor, student
  profileImageUrl: text('profile_image_url'),
  isActive: boolean('is_active').default(true),
  tenantId: varchar('tenant_id', { length: 100 }).notNull().default('default'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const camps = pgTable('camps', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  instructorId: uuid('instructor_id').references(() => users.id),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  duration: varchar('duration', { length: 50 }).notNull(),
  capacity: integer('capacity').notNull(),
  enrolled: integer('enrolled').default(0),
  status: varchar('status', { length: 20 }).notNull().default('upcoming'), // upcoming, active, completed
  schedule: text('schedule').notNull(),
  location: varchar('location', { length: 100 }).default('Virtual'),
  category: varchar('category', { length: 50 }).notNull(),
  ageGroup: varchar('age_group', { length: 20 }).notNull(),
  price: integer('price').default(0), // in cents
  meetingLink: text('meeting_link'),
  totalSessions: integer('total_sessions').default(1),
  completedSessions: integer('completed_sessions').default(0),
  tenantId: varchar('tenant_id', { length: 100 }).notNull().default('default'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const enrollments = pgTable('enrollments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  campId: uuid('camp_id').references(() => camps.id).notNull(),
  parentName: varchar('parent_name', { length: 255 }),
  parentEmail: varchar('parent_email', { length: 255 }),
  childName: varchar('child_name', { length: 255 }),
  childAge: integer('child_age'),
  preferredFormat: varchar('preferred_format', { length: 50 }),
  newsletter: boolean('newsletter').default(false),
  status: varchar('status', { length: 20 }).default('enrolled'), // enrolled, completed, dropped
  enrolledAt: timestamp('enrolled_at').defaultNow(),
  completedAt: timestamp('completed_at'),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  senderId: uuid('sender_id').references(() => users.id).notNull(),
  campId: uuid('camp_id').references(() => camps.id),
  recipientId: uuid('recipient_id').references(() => users.id),
  content: text('content').notNull(),
  messageType: varchar('message_type', { length: 20 }).default('text'), // text, announcement, system
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const assignments = pgTable('assignments', {
  id: uuid('id').primaryKey().defaultRandom(),
  campId: uuid('camp_id').references(() => camps.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  dueDate: timestamp('due_date'),
  maxPoints: integer('max_points').default(100),
  instructions: text('instructions'),
  attachments: jsonb('attachments'), // Array of file URLs
  isPublished: boolean('is_published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  assignmentId: uuid('assignment_id').references(() => assignments.id).notNull(),
  studentId: uuid('student_id').references(() => users.id).notNull(),
  content: text('content'),
  attachments: jsonb('attachments'), // Array of file URLs
  points: integer('points'),
  feedback: text('feedback'),
  status: varchar('status', { length: 20 }).default('submitted'), // submitted, graded, returned
  submittedAt: timestamp('submitted_at').defaultNow(),
  gradedAt: timestamp('graded_at'),
});

export const resources = pgTable('resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  campId: uuid('camp_id').references(() => camps.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  resourceType: varchar('resource_type', { length: 50 }).notNull(), // document, video, link, interactive
  url: text('url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  fileSize: integer('file_size'),
  duration: integer('duration'), // in minutes for videos
  isPublic: boolean('is_public').default(false),
  downloadCount: integer('download_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const liveSessions = pgTable('live_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  campId: uuid('camp_id').references(() => camps.id).notNull(),
  instructorId: uuid('instructor_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time'),
  status: varchar('status', { length: 20 }).default('scheduled'), // scheduled, active, completed, cancelled
  meetingLink: text('meeting_link'),
  recordingUrl: text('recording_url'),
  attendees: jsonb('attendees'), // Array of user IDs
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  enrollments: many(enrollments),
  sentMessages: many(messages, { relationName: 'sender' }),
  receivedMessages: many(messages, { relationName: 'recipient' }),
  instructedCamps: many(camps),
  submissions: many(submissions),
  liveSessions: many(liveSessions),
}));

export const campsRelations = relations(camps, ({ one, many }) => ({
  instructor: one(users, {
    fields: [camps.instructorId],
    references: [users.id],
  }),
  enrollments: many(enrollments),
  messages: many(messages),
  assignments: many(assignments),
  resources: many(resources),
  liveSessions: many(liveSessions),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  camp: one(camps, {
    fields: [enrollments.campId],
    references: [camps.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: 'sender',
  }),
  recipient: one(users, {
    fields: [messages.recipientId],
    references: [users.id],
    relationName: 'recipient',
  }),
  camp: one(camps, {
    fields: [messages.campId],
    references: [camps.id],
  }),
}));

export const assignmentsRelations = relations(assignments, ({ one, many }) => ({
  camp: one(camps, {
    fields: [assignments.campId],
    references: [camps.id],
  }),
  submissions: many(submissions),
}));

export const submissionsRelations = relations(submissions, ({ one }) => ({
  assignment: one(assignments, {
    fields: [submissions.assignmentId],
    references: [assignments.id],
  }),
  student: one(users, {
    fields: [submissions.studentId],
    references: [users.id],
  }),
}));

export const resourcesRelations = relations(resources, ({ one }) => ({
  camp: one(camps, {
    fields: [resources.campId],
    references: [camps.id],
  }),
}));

export const liveSessionsRelations = relations(liveSessions, ({ one }) => ({
  camp: one(camps, {
    fields: [liveSessions.campId],
    references: [camps.id],
  }),
  instructor: one(users, {
    fields: [liveSessions.instructorId],
    references: [users.id],
  }),
}));
