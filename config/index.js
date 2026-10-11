/**
 * Centralized runtime configuration.
 * All values can be overridden via environment variables (see .env.example).
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const env = process.env.NODE_ENV || 'development';

module.exports = {
  env,

  name: process.env.APP_NAME || 'koa2-api-boilerplate',

  port: parseInt(process.env.PORT, 10) || 3000,

  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/koa2_api',

  // Keep the default safe but require overriding in production.
  session: {
    secret: process.env.SESSION_SECRET || 'change-me-in-production',
    // 2 hours
    maxAge: 2 * 60 * 60 * 1000,
  },
};
