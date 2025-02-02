import { router } from '../trpc';
// import { SwimmingPoolRouter } from './swimming-pool';
import { FacilityTypeRouter } from './facility-type';
// import { ProvinceRouter } from './province';

export type AppRouter = typeof appRouter;

export const appRouter = router({
  'facility-type': FacilityTypeRouter,
});
