# Node.js Course Management API

A modern, type-safe REST API for managing courses built with Node.js, Fastify, TypeScript, and PostgreSQL.

## 🚀 Features

- **Type-Safe API**: Built with TypeScript and Zod for runtime validation
- **Fast & Lightweight**: Powered by Fastify for high performance
- **Database Integration**: PostgreSQL with Drizzle ORM for type-safe database operations
- **API Documentation**: Auto-generated OpenAPI/Swagger documentation
- **Docker Support**: Easy development setup with Docker Compose
- **Modern Development**: Hot reload, pretty logging, and development tools

## 📋 API Endpoints

### Courses

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/courses` | Create a new course |
| `GET` | `/courses` | Get all courses |
| `GET` | `/courses/:id` | Get a specific course by ID |

### Example Requests

#### Create a Course
```http
POST http://localhost:3333/courses
Content-Type: application/json

{
  "title": "Advanced TypeScript"
}
```

#### Get All Courses
```http
GET http://localhost:3333/courses
```

#### Get Course by ID
```http
GET http://localhost:3333/courses/{course-id}
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI with Scalar
- **Containerization**: Docker & Docker Compose

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nodejsChallenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   DATABASE_URL=postgresql://user:password@localhost:5432/challenge
   ```

4. **Start the database**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3333`

## 📚 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run db:generate` | Generate database migrations |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Drizzle Studio for database management |

## 📖 API Documentation

When running in development mode, you can access the interactive API documentation:

- **Swagger UI**: `http://localhost:3333/documentation`
- **Scalar API Reference**: `http://localhost:3333/docs`

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
```

### Courses Table
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL UNIQUE,
  description TEXT
);
```

## 🐳 Docker

The application includes Docker Compose configuration for easy development setup:

```yaml
services:
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: challenge
    ports:
      - "5432:5432"
```

## 🏗️ Project Structure

```
├── src/
│   ├── database/
│   │   ├── client.ts      # Database connection
│   │   └── schema.ts      # Database schema definitions
│   └── routes/
│       ├── create-courses.ts
│       ├── get-courses.ts
│       └── get-courses-by-id.ts
├── drizzle/               # Database migrations
├── server.ts             # Main application entry point
├── docker-compose.yml    # Docker configuration
├── drizzle.config.ts     # Drizzle ORM configuration
└── package.json
```

## 🔧 Development

### Adding New Routes

1. Create a new route file in `src/routes/`
2. Define your schema with Zod validation
3. Register the route in `server.ts`

Example:
```typescript
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const myRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/my-endpoint', {
    schema: {
      response: {
        200: z.object({
          message: z.string()
        })
      }
    }
  }, async (request, reply) => {
    return { message: 'Hello World!' }
  })
}
```

### Database Migrations

1. Modify the schema in `src/database/schema.ts`
2. Generate migration: `npm run db:generate`
3. Apply migration: `npm run db:migrate`

## 📝 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

Built with ❤️ using Node.js and TypeScript
