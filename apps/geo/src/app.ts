import { ApiError, globalErrorHandler } from '@server/middlewares';
import { HttpStatusCode } from '@server/utils';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import administrativeRouter from './routes/administrativeRoutes';
import gadmRouter from './routes/gadmRoutes';

const app: Application = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Proxy middleware
app.set('trust proxy', 1);

// Parse request bodies
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));

// Parse cookies
app.use(cookieParser());

// app.use(helmet());

// Rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      new ApiError(
        'Too many requests, please try again later.',
        HttpStatusCode.TOO_MANY_REQUESTS,
      ),
    );
  },
});

app.use(limiter);

// Configure Cross-Origin Resource Sharing (CORS)
app.options('*', cors());

// Get user device info

app.get('/', async (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '🚀 Welcome to Auth! Your API is running perfectly.',
  });
});

app.use('/api/v1/gadm', gadmRouter);
app.use('/api/v1/administrative', administrativeRouter);

// Handle 404 errors
app.all(/(.*)/, (req: Request, res: Response, next: NextFunction) => {
  return next(
    new ApiError(
      `Can't find ${req.originalUrl} on this server!`,
      HttpStatusCode.NOT_FOUND,
    ),
  );
});

// Global error handling middleware
app.use(globalErrorHandler);

export default app;
