import type { Request } from 'express';

import { rateLimit } from 'express-rate-limit';

import { config } from '@/utils/config';

export const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: config.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  windowMs: 15 * 60 * config.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req: Request) => req.ip as string,
});
