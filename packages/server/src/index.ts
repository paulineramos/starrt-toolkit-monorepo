import * as trpcExpress from '@trpc/server/adapters/express';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import multer from 'multer';
import { logger } from '@/middleware/logger';
import { rateLimiter } from '@/middleware/rate-limiter';

import { createContext } from '@/trpc';
import { appRouter } from '@/router';
import { config } from '@/utils/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({ origin: config.ALLOWED_ORIGINS, credentials: true }));
// app.use(cors());
app.use(hpp({}));
app.use(helmet());
app.use(morgan('tiny'));
app.use(multer().single('file'));
app.use(rateLimiter);
app.disable('x-powered-by');

app.use(logger());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use('/', async (_req, res) => {
  res.status(200).send();
});

const PORT = config.PORT ?? 3000;

app.listen(PORT, () => {
  console.log('  SERVER');
  console.log(`  ➜  (${config.NODE_ENV}): http://localhost:${PORT}`);
});
