import { sql } from 'drizzle-orm';
import {
  boolean,
  char,
  decimal,
  int,
  json,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

type MultiLanguage = {
  en: string;
  fr: string;
};

export const provinces = mysqlTable('Province', {
  id: char({ length: 2 }).notNull().primaryKey(),
  name: json(),
  territory: boolean().notNull().default(false),
});

export const facilityTypes = mysqlTable('FacilityType', {
  id: serial().notNull().primaryKey(),
  name: json().$type<MultiLanguage>().notNull(),
});

export const swimmingPools = mysqlTable('SwimmingPool', {
  id: serial().notNull().primaryKey(),
  refId: varchar({ length: 200 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  address2: varchar({ length: 255 }),
  city: varchar({ length: 100 }).notNull(),
  region: varchar({ length: 100 }).notNull(),
  postalCode: varchar({ length: 20 }).notNull(),
  email: varchar({ length: 255 }),
  website: text(),
  phone: varchar({ length: 50 }).notNull(),
  latitude: decimal({ precision: 10, scale: 6 }).notNull(),
  longitude: decimal({ precision: 10, scale: 6 }).notNull(),
  temperature: json().$type<MultiLanguage>().notNull(),
  length: json().$type<MultiLanguage>().notNull(),
  depth: json().$type<MultiLanguage>().notNull(),
  accessibility: json().$type<MultiLanguage>().notNull(),
  information: json().$type<MultiLanguage>().notNull(),
  createdAt: timestamp('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`),
  provinceId: char('provinceId').references(() => provinces.id),
  facilityTypeId: int('facilityTypeId').references(() => facilityTypes.id),
  // distance: text('distance').generatedAlwaysAs(
  //   (): SQL => sql`
  //     ROUND(ST_DISTANCE_SPHERE(
  //       ST_GeomFromText(CONCAT('POINT(', s.longitude, ' ', s.latitude, ')')),
  //       ST_GeomFromText('POINT(${swimmingPools.longitude} ${swimmingPools.latitude})')
  //     )) AS distance
  //   `,
  //   { mode: 'virtual' }
  // ),
});
