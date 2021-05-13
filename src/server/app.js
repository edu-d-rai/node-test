import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';

import { adminbroRouter } from './routes/adminbro.route';
import { albumApiRouter } from './routes/albumApi.route';
import { concertApiRouter } from './routes/concertApi.route';
import { getAlbumSongsRouter } from './routes/getAlbumSongs.route';
import { getAlbumsByStarsRouter } from './routes/getAlbumsByStars.route';
import { musicianApiRouter } from './routes/musicianApi.route';
import { musicianFetchAllRouter } from './routes/musicianFetchAll.route';
import { musicianFetchInfluencerRouter } from './routes/musicianFetchInfluencer.route';
import { musicianOnlyFetchApiRouter } from './routes/musicianOnlyFetchApi.route';
import { musicianUpdateInfluencerRouter } from './routes/musicianUpdateInfluencer.route';
import { songApiRouter } from './routes/songApi.route';

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

app.use('/musician-api', musicianApiRouter);

app.use('/album-api', albumApiRouter);

app.use('/song-api', songApiRouter);

app.use('/concert-api', concertApiRouter);

app.use('/musician-fetch-influencer', musicianFetchInfluencerRouter);

app.use('/musician-update-influencer', musicianUpdateInfluencerRouter);

app.use('/musician-fetch-all', musicianFetchAllRouter);

app.use('/musician-only-fetch-api', musicianOnlyFetchApiRouter);

app.use('/get-albums-by-stars', getAlbumsByStarsRouter);

app.use('/get-album-songs', getAlbumSongsRouter);

// Use custom response handler
app.use(responseHandler);

// Use custom error handler
app.use(errorHandler);

// Page not found
app.use(pageNotFoundHandler);

export { app };
