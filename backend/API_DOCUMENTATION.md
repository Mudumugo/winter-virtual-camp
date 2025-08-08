# Winter Virtual Camp Backend API Documentation

## Overview

The Winter Virtual Camp backend provides a comprehensive REST API for managing educational camps, users, registrations, and real-time features. Built with Express.js, TypeScript, PostgreSQL, and MinIO for file storage.

## Base URL

```
http://localhost:5000/api
```

## Authentication

The API uses session-based authentication with role-based access control.

### Demo Login
```bash
# Admin login
curl -X POST http://localhost:5000/api/auth/demo-login \
  -H "Content-Type: application/json" \
  -d '{"role":"admin"}' \
  -c cookies.txt

# Instructor login  
curl -X POST http://localhost:5000/api/auth/demo-login \
  -H "Content-Type: application/json" \
  -d '{"role":"instructor"}' \
  -c cookies.txt

# Student login
curl -X POST http://localhost:5000/api/auth/demo-login \
  -H "Content-Type: application/json" \
  -d '{"role":"student"}' \
  -c cookies.txt
```

### Logout
```bash
curl -X POST http://localhost:5000/api/auth/logout -b cookies.txt
```

## API Endpoints

### Camps Management

#### Get All Camps
```bash
curl -b cookies.txt "http://localhost:5000/api/camps?page=1&limit=20"
```

Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `category` (optional): Filter by camp category
- `ageGroup` (optional): Filter by age group
- `status` (optional): Filter by status (upcoming, active, completed)
- `search` (optional): Search in camp names and descriptions

#### Get Camp by ID
```bash
curl -b cookies.txt http://localhost:5000/api/camps/{campId}
```

#### Create Camp (Admin only)
```bash
curl -X POST http://localhost:5000/api/camps \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "New Camp",
    "description": "Camp description",
    "instructorId": "instructor-uuid",
    "startDate": "2024-08-01",
    "endDate": "2024-08-05",
    "duration": "1 week",
    "capacity": 20,
    "schedule": "Mon-Fri, 9AM-12PM",
    "location": "Virtual",
    "category": "Programming",
    "ageGroup": "9-12",
    "price": 19900
  }'
```

#### Update Camp (Admin only)
```bash
curl -X PUT http://localhost:5000/api/camps/{campId} \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name": "Updated Camp Name"}'
```

#### Delete Camp (Admin only)
```bash
curl -X DELETE http://localhost:5000/api/camps/{campId} -b cookies.txt
```

### User Management

#### Get User Profile
```bash
curl -b cookies.txt http://localhost:5000/api/users/profile
```

#### Update User Profile
```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "firstName": "Updated Name",
    "lastName": "Updated Last Name"
  }'
```

#### Get All Users (Admin only)
```bash
curl -b cookies.txt http://localhost:5000/api/users
```

#### Get Instructors (Admin only)
```bash
curl -b cookies.txt http://localhost:5000/api/users/instructors
```

#### Get Camp Students (Admin/Instructor)
```bash
curl -b cookies.txt http://localhost:5000/api/users/camp/{campId}/students
```

### Registration System

#### Get Available Camps for Registration
```bash
curl http://localhost:5000/api/registration/camps
```

#### Submit Registration
```bash
curl -X POST http://localhost:5000/api/registration/submit \
  -H "Content-Type: application/json" \
  -d '{
    "parentName": "John Doe",
    "email": "parent@example.com",
    "childName": "Jane Doe",
    "age": 10,
    "preferredCamp": "Web Development Bootcamp",
    "format": "live",
    "newsletter": true
  }'
```

#### Check Registration Status
```bash
curl http://localhost:5000/api/registration/status/{email}
```

### Resources Management

#### Get Camp Resources
```bash
curl -b cookies.txt http://localhost:5000/api/resources/camp/{campId}
```

#### Get Public Resources
```bash
curl "http://localhost:5000/api/resources/public?search=tutorial&type=video"
```

#### Create Resource (Admin/Instructor)
```bash
curl -X POST http://localhost:5000/api/resources \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "campId": "camp-uuid",
    "title": "Resource Title",
    "description": "Resource description",
    "resourceType": "document",
    "url": "https://example.com/resource.pdf",
    "isPublic": false
  }'
```

### Messages

#### Get Camp Messages
```bash
curl -b cookies.txt http://localhost:5000/api/messages/camp/{campId}
```

#### Send Message
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "campId": "camp-uuid",
    "content": "Hello everyone!",
    "messageType": "announcement"
  }'
```

### Analytics (Admin only)

#### Get Dashboard Overview
```bash
curl -b cookies.txt http://localhost:5000/api/analytics/overview
```

#### Get Camp Analytics
```bash
curl -b cookies.txt http://localhost:5000/api/analytics/camps
```

#### Get User Analytics
```bash
curl -b cookies.txt http://localhost:5000/api/analytics/users
```

### File Upload

#### Upload File
```bash
curl -X POST http://localhost:5000/api/upload \
  -b cookies.txt \
  -F "file=@/path/to/file.pdf" \
  -F "bucket=camp-resources" \
  -F "campId=camp-uuid"
```

## WebSocket Events

Connect to WebSocket at `ws://localhost:5000` for real-time features:

### Events
- `join-camp`: Join a camp room
- `leave-camp`: Leave a camp room
- `camp-message`: Send/receive camp messages
- `session-control`: Instructor session controls
- `user-joined`: User joined notification
- `user-left`: User left notification

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

## Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

## Rate Limiting

API requests are rate-limited to prevent abuse:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per authenticated user

## Data Models

### User
```typescript
{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'instructor' | 'student';
  profileImageUrl?: string;
  isActive: boolean;
  createdAt: Date;
}
```

### Camp
```typescript
{
  id: string;
  name: string;
  description: string;
  instructorId: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  capacity: number;
  enrolled: number;
  status: 'upcoming' | 'active' | 'completed';
  schedule: string;
  location: string;
  category: string;
  ageGroup: string;
  price: number;
}
```

### Enrollment
```typescript
{
  id: string;
  userId: string;
  campId: string;
  parentName: string;
  parentEmail: string;
  childName: string;
  childAge: number;
  preferredFormat: 'live' | 'self-paced' | 'hybrid';
  newsletter: boolean;
  status: 'pending' | 'confirmed' | 'cancelled';
  enrolledAt: Date;
}
```
