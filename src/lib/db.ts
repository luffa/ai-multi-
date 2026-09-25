/**
 * SQLite helpers for contact + guestbook.
 * Lab 05 (OpenCode) implements persistence. Stubs return null until finishe.
 */
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  const dir = process.env.DATA_DIR || join(process.cwd(), 'data');
  mkdirSync(dir, { recursive: true });
  db = new Database(join(dir, 'site.sqlite'));
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS guestbook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requireNonEmpty(value: unknown, field: string, maxLen: number): string {
  if (typeof value !== 'string') {
    throw new Error(`VALIDATION: ${field} must be a string`);
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    throw new Error(`VALIDATION: ${field} must not be empty`);
  }
  if (trimmed.length > maxLen) {
    throw new Error(`VALIDATION: ${field} must be at most ${maxLen} characters`);
  }
  return trimmed;
}

export function insertContact(input: {
  name: string;
  email: string;
  message: string;
}): ContactMessage {
  const name = requireNonEmpty(input?.name, 'name', 80);
  const message = requireNonEmpty(input?.message, 'message', 500);
  const email = requireNonEmpty(input?.email, 'email', 254);
  if (!EMAIL_RE.test(email)) {
    throw new Error('VALIDATION: email is not a valid format');
  }
  const database = getDb();
  const stmt = database.prepare(
    `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`,
  );
  const info = stmt.run(name, email, message);
  const row = database
    .prepare(
      `SELECT id, name, email, message, created_at FROM contact_messages WHERE id = ?`,
    )
    .get(info.lastInsertRowid) as ContactMessage;
  return row;
}

export function listGuestbook(): GuestbookEntry[] {
  const database = getDb();
  const rows = database
    .prepare(
      `SELECT id, name, message, created_at FROM guestbook ORDER BY id DESC`,
    )
    .all() as GuestbookEntry[];
  return rows;
}

export function insertGuestbook(input: {
  name: string;
  message: string;
}): GuestbookEntry {
  const name = requireNonEmpty(input?.name, 'name', 80);
  const message = requireNonEmpty(input?.message, 'message', 500);
  const database = getDb();
  const stmt = database.prepare(
    `INSERT INTO guestbook (name, message) VALUES (?, ?)`,
  );
  const info = stmt.run(name, message);
  const row = database
    .prepare(`SELECT id, name, message, created_at FROM guestbook WHERE id = ?`)
    .get(info.lastInsertRowid) as GuestbookEntry;
  return row;
}
