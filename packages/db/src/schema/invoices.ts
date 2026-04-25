import { pgTable, text, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { clientsTable } from "./clients";
import { projectsTable } from "./projects";

export const invoicesTable = pgTable("invoices", {
  id: text("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  title: text("title"),
  status: text("status").notNull().default("DRAFT"),
  issueDate: timestamp("issue_date", { withTimezone: true }).notNull().defaultNow(),
  dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
  paidDate: timestamp("paid_date", { withTimezone: true }),
  currency: text("currency").notNull().default("INR"),
  subtotal: real("subtotal").notNull().default(0),
  taxRate: real("tax_rate").notNull().default(0),
  taxAmount: real("tax_amount").notNull().default(0),
  discountRate: real("discount_rate").notNull().default(0),
  discountAmount: real("discount_amount").notNull().default(0),
  total: real("total").notNull().default(0),
  notes: text("notes"),
  terms: text("terms"),
  publicToken: text("public_token").notNull().unique(),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  userId: text("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  clientId: text("client_id").notNull().references(() => clientsTable.id),
  projectId: text("project_id").references(() => projectsTable.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertInvoiceSchema = createInsertSchema(invoicesTable).omit({ createdAt: true, updatedAt: true });
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoicesTable.$inferSelect;
