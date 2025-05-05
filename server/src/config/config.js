import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.SECRET_KEY,
    accessExpirationMinutes: parseInt(process.env.JWT_ACCESS_EXPIRATION, 10), 
    refreshExpirationDays: parseInt(process.env.JWT_REFRESH_EXPIRATION, 10),  
  },

};

export default config;
