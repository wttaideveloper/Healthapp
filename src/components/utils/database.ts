import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | undefined;
let dbInitPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) {
    return db;
  }

  if (dbInitPromise) {
    return dbInitPromise;
  }

  dbInitPromise = (async () => {
    try {
      db = await SQLite.openDatabaseAsync('health_reports.db');

      await db.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
      
      CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL,
        user_name TEXT,
        user_email TEXT,
        title TEXT NOT NULL,
        answers TEXT NOT NULL,
        report_data TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now','localtime'))
      );
      
      CREATE TABLE IF NOT EXISTS groups (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        created_at TEXT DEFAULT (datetime('now','localtime'))
      );
      
      CREATE TABLE IF NOT EXISTS report_groups (
        report_id TEXT NOT NULL,
        group_id TEXT NOT NULL,
        PRIMARY KEY (report_id, group_id),
        FOREIGN KEY (report_id) REFERENCES reports (id) ON DELETE CASCADE,
        FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE
      );

         CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      phone_number TEXT,
      address TEXT
    );
    -- Settings is a singleton record used by report branding/contact screens.
    INSERT OR IGNORE INTO settings (id) VALUES (1);
    `);

      console.log('Database initialized successfully');
      return db;
    } catch (error) {
      dbInitPromise = null;
      console.error('Error initializing database:', error);
      throw error;
    }
  })();

  return dbInitPromise;
};

export const waitForDatabase = async (): Promise<SQLite.SQLiteDatabase> => initDatabase();

export const isDatabaseReady = (): boolean => Boolean(db);

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
};
