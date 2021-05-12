import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';

import { adminbroRouter } from './routes/adminbro.route';
import { m1Router } from './routes/m1.route';
import { m2Router } from './routes/m2.route';

import {
  errorHandler,
  responseHandler,
  pageNotFoundHandler,
  initResLocalsHandler,
} from './middlewares';

const app = express();

// Swagger
app.use('/swagger', swaggerUi.serveFiles(swaggerDocument), swaggerUi.setup(swaggerDocument));

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(initResLocalsHandler);

app.use('/admin', adminbroRouter);

app.use('/m2', m2Router);

app.use('/m1', m1Router);


// Use custom response handler
app.use(responseHandler);

// Use custom error handler
app.use(errorHandler);

// Page not found
app.use(pageNotFoundHandler);

export { app };
