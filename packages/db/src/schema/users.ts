import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";


export const usersTable = pgTable("users", {
  id: text("id").primaryKey(), 
  name: text("name"),
  email: text("email").notNull().unique(),
  businessName: text("business_name"),
  businessLogo: text("business_logo"),
  address: text("address"),
  phone: text("phone"),
  taxNumber: text("tax_number"),
  currency: text("currency").notNull().default("INR"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});


export const insertUserSchema = createInsertSchema(usersTable).omit({ createdAt: true, updatedAt: true });


export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
