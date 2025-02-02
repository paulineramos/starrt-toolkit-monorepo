import 'dotenv/config';
import { z } from 'zod';

const configSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development').readonly(),
    PORT: z.preprocess(Number, z.number()).default(8080).readonly(),
    HOST: z.string().readonly(),
    ACCESS_TOKEN: z.string().readonly(),
    DATABASE_URL: z.string().url().readonly(),
    // CORS_ORIGIN: z.string().url().readonly(),
    ALLOWED_ORIGINS: z.string().default('*'),
    COMMON_RATE_LIMIT_MAX_REQUESTS: z.preprocess(Number, z.number()).default(1000).readonly(),
    COMMON_RATE_LIMIT_WINDOW_MS: z.preprocess(Number, z.number()).default(1000).readonly(),
  })
  .readonly();

export type ConfigType = z.infer<typeof configSchema>;

export const config = configSchema.parse(process.env);
