# Winter Virtual Camp Backend

A comprehensive backend API for the Winter Virtual Camp educational platform built with Node.js, Express.js, PostgreSQL, and Docker.

## Features

- **Authentication & Authorization**: Role-based access control (Admin, Instructor, Student)
- **Camp Management**: CRUD operations for educational camps
- **User Registration**: Multi-step quiz-based enrollment system
- **Real-time Features**: WebSocket support for live sessions and messaging
- **File Storage**: MinIO integration for camp materials and user uploads
- **Database**: PostgreSQL with Drizzle ORM
- **Docker Ready**: Complete containerization with docker-compose

## Quick Start

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Development Setup

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Docker Deployment

1. **Build and start all services**
   ```bash
   docker-compose up -d
   ```

2. **Initialize database with seed data**
   ```bash
   docker-compose exec backend npm run db:seed
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MinIO Console: http://localhost:9001

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/demo-login` - Demo login by role
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Check session status

### Camps
- `GET /api/camps` - List all camps (with filtering)
- `GET /api/camps/:id` - Get camp details
- `POST /api/camps` - Create camp (Admin only)
- `PUT /api/camps/:id` - Update camp (Admin only)
- `DELETE /api/camps/:id` - Delete camp (Admin only)
- `GET /api/camps/instructor/my-camps` - Get instructor's camps

### Registration
- `POST /api/registration/submit` - Submit camp registration
- `GET /api/registration/camps` - Get available camps
- `GET /api/registration/status/:email` - Check enrollment status

### Users
- `GET /api/users` - List all users (Admin only)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/instructors` - Get all instructors (Admin only)
- `GET /api/users/camp/:campId/students` - Get camp students

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/camp/:campId` - Get camp messages
- `GET /api/messages/direct/:userId` - Get direct messages
- `PUT /api/messages/:messageId/read` - Mark message as read
- `GET /api/messages/unread/count` - Get unread count

### Resources
- `GET /api/resources/camp/:campId` - Get camp resources
- `GET /api/resources/public` - Get public resources
- `POST /api/resources` - Create resource
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource

### Live Sessions
- `POST /api/sessions` - Create live session (Instructor)
- `GET /api/sessions/camp/:campId` - Get camp sessions
- `POST /api/sessions/:id/start` - Start session (Instructor)
- `POST /api/sessions/:id/end` - End session (Instructor)
- `POST /api/sessions/:id/join` - Join session (Student)

### File Upload
- `POST /api/upload/camp-resource` - Upload camp resource
- `POST /api/upload/profile-image` - Upload profile image
- `POST /api/upload/assignment-submission` - Upload assignment files

### Analytics
- `GET /api/analytics/dashboard` - Dashboard analytics (Admin)
- `GET /api/analytics/instructor` - Instructor analytics
- `GET /api/analytics/student` - Student analytics

## Database Schema

### Core Tables
- **users**: User accounts with role-based access
- **camps**: Educational camp information
- **enrollments**: User-camp relationships with registration data
- **messages**: Camp and direct messaging
- **assignments**: Camp assignments and submissions
- **resources**: Camp materials and resources
- **live_sessions**: Real-time session management

## Real-time Features

The backend supports WebSocket connections for:
- Live session management
- Real-time messaging
- Session control (instructor features)
- Screen sharing coordination
- User notifications

## File Storage

MinIO integration provides:
- Camp resource storage
- User profile images
- Assignment submissions
- Automatic thumbnail generation
- Presigned URL access

## Security Features

- Helmet.js for security headers
- Rate limiting on API endpoints
- Input validation with express-validator
- Session-based authentication
- Role-based authorization
- File type validation for uploads

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/techtutor` |
| `PORT` | Server port | `5000` |
| `SESSION_SECRET` | Session encryption key | Required |
| `MINIO_ENDPOINT` | MinIO server endpoint | `localhost` |
| `MINIO_ACCESS_KEY` | MinIO access key | `minioadmin` |
| `MINIO_SECRET_KEY` | MinIO secret key | `minioadmin` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## Demo Accounts

After seeding the database, you can use these demo accounts:

- **Admin**: admin@wintercamp.com / admin123
- **Instructor**: sarah.mitchell@wintercamp.com / instructor123
- **Student**: student@wintercamp.com / student123

Or use the demo login endpoint with roles: `admin`, `instructor`, `student`

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run lint         # Run ESLint
npm test            # Run tests
```

## Docker Services

- **backend**: Node.js Express API server
- **db**: PostgreSQL database
- **minio**: Object storage for files
- **frontend**: React frontend (when using docker-compose)

## Monitoring and Logging

- Winston logger with file and console output
- Health check endpoint at `/api/health`
- Error handling middleware
- Request logging in development

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure Docker build passes

## License

MIT License - see LICENSE file for details
