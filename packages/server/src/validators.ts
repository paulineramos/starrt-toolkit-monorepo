import { z } from 'zod';

export const validationNumericId = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num: number) => num > 0, 'ID must be a positive number'),
  // ... other common validations
};

export const validationLatLng = {
  lat: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), 'Latitude a numeric value')
    .transform(Number),
  // .refine((num) => num > -90 && num < 90, 'Latitude must be within [-90.000000, 90.000000]'),
  lng: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), 'Latitude a numeric value')
    .transform(Number),
  // .refine((num) => num > 0, 'Latitude a positive number'),
};
