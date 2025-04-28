import { configDotenv } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the appropriate .env file based on the environment
const envPath = process.env.NODE_ENV === 'test'
  ? path.resolve(__dirname, '../.env.test')
  : path.resolve(__dirname, '../.env');

configDotenv({ path: envPath });

// Export database configs
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
};

export default dbConfig;
