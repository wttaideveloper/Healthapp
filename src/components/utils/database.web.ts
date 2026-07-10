export const initDatabase = async () => {
  // Web build: expo-sqlite currently fails to bundle (missing wasm worker asset).
  // Keep the app bootable by disabling sqlite-backed history on web.
  return null;
};

export const waitForDatabase = async () => null;

export const isDatabaseReady = () => true;

export const getDatabase = () => {
  throw new Error("Database is not available on web.");
};
