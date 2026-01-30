import { config } from './configs';
import { db } from './db';

// Initialize MongoDB connection
async function initializeMongoDB() {
  try {
    await db(config.DB);
    console.log('✅ Connected to MongoDB 🍃');
  } catch (error) {
    console.error('❌ MongoDB 🍃 Connection Error:', (error as Error).message);
    process.exit(1);
  }
}

export { initializeMongoDB };
