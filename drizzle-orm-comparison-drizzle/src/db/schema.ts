import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable(
 "users",
 {
  id: serial("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
 },
 (table) => {
  return {
   emailIdx: uniqueIndex("email_idx").on(table.email),
  };
 }
);

export const usersRelations = relations(users, ({ many }) => ({
 bookmarks: many(bookmarks),
}));

export const bookmarks = pgTable("bookmarks", {
 id: serial("id").primaryKey(),
 imageUrl: text("image_url"),
 malUrl: text("mal_url"),
 malId: integer("mal_id"),
 title: text("title"),
 desc: text("desc"),
 aired: text("aired"),
 season: text("season"),
 userId: serial("user_id").notNull(),
});

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
 author: one(users, {
  fields: [bookmarks.userId],
  references: [users.id],
 }),
}));
