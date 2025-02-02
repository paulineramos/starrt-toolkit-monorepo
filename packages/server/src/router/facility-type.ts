import { z } from 'zod';
import { router, publicProcedure } from '@/trpc';
import { facilityTypes } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/db';
import { createSelectSchema } from 'drizzle-zod';
import { validationNumericId } from '@/validators';

const FacilityTypeSchema = createSelectSchema(facilityTypes, {
  name: z.object({
    en: z.string().min(1),
    fr: z.string().min(1),
  }),
});
const FacilityTypeCreateSchema = FacilityTypeSchema.omit({ id: true });
const FacilityTypeUpdatechema = FacilityTypeSchema.omit({ id: true });

// type FacilityType = z.infer<typeof FacilityTypeSchema>
// type FacilityType = typeof facilityTypes.$inferSelect;

export const FacilityTypeRouter = router({
  list: publicProcedure.query(async () => {
    // return await db.query.facilityTypes.findMany({
    //   orderBy: (facilityType, { asc }) => [asc(facilityType.name)],
    // });
    return await db
      .select()
      .from(facilityTypes)
      .orderBy(sql`name->"$.en" asc`);
  }),

  get: publicProcedure.input(z.object({ id: validationNumericId.id })).query(async ({ input }) => {
    const { id } = input;
    const facilityType = await db.query.facilityTypes.findFirst({
      where: (facilityType, { eq }) => eq(facilityType.id, id),
    });

    if (facilityType) {
      return facilityType;
    }

    return `Facility Type with id:${id} does not exist in database.` as const;
  }),

  create: publicProcedure
    // .input(FacilityTypeCreateSchema)
    .input(z.object({ payload: FacilityTypeCreateSchema }))
    .mutation(async ({ input }) => {
      const { payload } = input;

      return await db.insert(facilityTypes).values(payload);
    }),

  update: publicProcedure
    .input(z.object({ id: validationNumericId.id, payload: FacilityTypeUpdatechema }))
    .mutation(async ({ input }) => {
      const { id, payload } = input;

      return await db.update(facilityTypes).set(payload).where(eq(facilityTypes.id, id));
    }),

  destroy: publicProcedure
    .input(z.object({ id: validationNumericId.id }))
    .mutation(async ({ input }) => {
      const { id } = input;

      return db.delete(facilityTypes).where(eq(facilityTypes.id, id));
    }),
});
