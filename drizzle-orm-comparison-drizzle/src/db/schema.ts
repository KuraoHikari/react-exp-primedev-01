import {
 pgTable,
 serial,
 text,
 timestamp,
 uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable(
 "users",
 {
  id: serial("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
 },
 (table) => {
  return {
   emailIdx: uniqueIndex("email_idx").on(table.email),
  };
 }
);
