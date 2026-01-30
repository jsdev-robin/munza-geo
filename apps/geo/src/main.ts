import http from 'http';
import app from './app';
import { config } from './configs/configs';
import { initializeMongoDB } from './configs/initializeConnection';

const httpServer = http.createServer(app);

// Utility: Graceful shutdown
async function gracefulShutdown(server: http.Server, signal: string) {
  console.log(`\n${signal} signal received: Closing HTTP server...`);

  // Close server
  server.close(async () => {
    console.log('✅ HTTP server closed 🛑');

    process.exit(0);
  });
}

// Initialize MongoDB, Redis, Cloudinary, etc.
(async function initializeApplication() {
  try {
    await initializeMongoDB();
  } catch (error) {
    console.error(
      '❌ Application Initialization Failed 💥:',
      (error as Error).message,
    );
    process.exit(1);
  }
})();

httpServer.listen(Number(config.PORT), () => {
  console.log(
    `🚀 Geo server is running on port ${config.PORT} in ${config.NODE_ENV}`,
  );
});

// Graceful shutdown on termination signals
['SIGINT', 'SIGTERM'].forEach((signal) =>
  process.on(signal, () => gracefulShutdown(httpServer, signal)),
);

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('❌ UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ UNHANDLED PROMISE REJECTION 💥:', err.message);
  process.exit(1);
});
