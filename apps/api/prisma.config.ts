import dotenv from 'dotenv';
import { defineConfig } from 'prisma/config';

dotenv.config({ path: './prisma/.env' });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('DATABASE_URL is missing is apps/api/prisma/.env');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: dbUrl,
  },
});
