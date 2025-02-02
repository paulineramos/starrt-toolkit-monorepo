import type { CreateTRPCReact } from '@trpc/react-query';
import { createTRPCReact } from '@trpc/react-query';
// import type { AppRouter } from '@api/src/router';
import type { AppRouter } from '../../../server/src/router';

export const trpc = createTRPCReact<AppRouter>();
