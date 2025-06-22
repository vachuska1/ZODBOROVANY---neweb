# Database Setup

## Prerequisites

- Node.js 16.8 or later
- PostgreSQL 12 or later
- pnpm (recommended) or npm

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zod-borovany
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following content:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/zod_borovany?schema=public"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

   Replace the database credentials with your PostgreSQL credentials.

4. **Set up the database**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run database migrations
   pnpm prisma migrate dev --name init
   ```

5. **Create an admin user**
   Run the following command to create an admin user:
   ```bash
   pnpm ts-node scripts/create-admin.ts
   ```

## Database Schema

The application uses the following database schema:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime? @map("email_verified")
  image         String?
  password      String
  role          String    @default("USER")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")


  @@map("users")
}

model Article {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   @db.Text
  excerpt     String?
  imageUrl    String?
  author      String
  publishedAt DateTime @default(now()) @map("published_at")
  isPublished Boolean  @default(false) @map("is_published")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("articles")
}
```

## Migrations

To create a new migration after modifying the schema:

```bash
pnpm prisma migrate dev --name your_migration_name
```

## Seeding the Database

To seed the database with sample data:

```bash
pnpm ts-node prisma/seed.ts
```

## Database Backups

It's recommended to set up regular database backups. Here's an example command to create a backup:

```bash
pg_dump -U username -d zod_borovany > backup_$(date +%Y%m%d).sql
```

## Troubleshooting

- If you encounter connection issues, verify your database credentials in `.env.local`
- Make sure PostgreSQL is running and accessible
- Check for any pending migrations with `pnpm prisma migrate status`
