import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import * as schema from './schema';

import { config } from '@/utils/config';

const client = await mysql.createConnection({
  uri: config.DATABASE_URL,
});

export const db = drizzle({
  client,
  schema,
  logger: config.NODE_ENV === 'development',
  mode: 'default',
});
