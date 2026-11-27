import { sqliteTable, text, integer, primaryKey, index } from 'drizzle-orm/sqlite-core';

export const needs = sqliteTable('needs', {
  id: text('id').primaryKey(),
  author: text('author').notNull(),
  stage: text('stage').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  created: integer('created').notNull(),
  kind: text('kind').notNull().default('need'),
  source: text('source'),
}, t => [index('needs_created').on(t.created)]);

export const votes = sqliteTable('votes', {
  need: text('need').notNull().references(() => needs.id, {onDelete: 'cascade'}),
  voter: text('voter').notNull(),
}, t => [primaryKey({columns: [t.need, t.voter]})]);
