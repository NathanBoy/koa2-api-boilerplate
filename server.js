/**
 * Server bootstrap.
 * Loads config, connects to MongoDB (best-effort), then starts the Koa app.
 */
const config = require('./config');
const app = require('./app');
const connectDB = require('./service/db');

async function bootstrap() {
  // DB connection is best-effort: the server still boots if Mongo is down,
  // so the app can be smoke-tested without a database.
  try {
    await connectDB(config.mongoUri);
    console.log(`[db] connected: ${config.mongoUri}`);
  } catch (err) {
    console.warn(`[db] connection failed, starting without database: ${err.message}`);
  }

  app.listen(config.port, () => {
    console.log(
      `[server] ${config.name} running at http://localhost:${config.port} (env=${config.env})`
    );
  });
}

bootstrap();
