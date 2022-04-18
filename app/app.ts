/* eslint-disable no-console */
import express from 'express';
import createError from 'http-errors';
import path from 'path';

import indexRouter from './routes/index';
import { getUserIdBySessionToken } from '../modules/auth/auth';
import { TenetError, DEFAULT_ERROR_HTTP_STATUS_CODE } from '../modules/util/tenetError';

require('dotenv').config();

const app = express();

let isDev;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  isDev = req.app.get('env') === 'development';

  res.locals.userAgent = ('user-agent' in req.headers) ? req.headers['user-agent'] : 'Unknown';

  res.setHeader('Content-Type', 'application/json');
  next();
});


// Auth middleware
app.use(async (req, res, next) => {
  res.locals.user = null;
  res.locals.userId = '';
  const authToken = req.header('Authorization') || null;

  // Whitelist
  const allowedPaths = [
    '/'
  ];
  if (allowedPaths.indexOf(req.path) > -1) {
    next();
    return;
  }

  if (!authToken) {
    console.log('Missing Auth token.');
    res.setHeader('Content-Type', 'application/json');
    res.status(401);
    res.json({ errorMessage: 'Unauthorized', status: 401, stackTrace: null });
    return;
  }

  try {
    res.locals.userId = await getUserIdBySessionToken(authToken);
    if (res.locals.userId) {
      next(); // Only if we have a user we move forward.
    }
  } catch (e) {
    const message = ('message' in e) ? e.message : e;
    console.log(message);
    const statusCode = ('statusCode' in e) ? e.statusCode : DEFAULT_ERROR_HTTP_STATUS_CODE;
    res.setHeader('Content-Type', 'application/json');
    res.status(statusCode);
    res.json({ errorMessage: e.message, status: e.statusCode, stackTrace: null });
  }
});

// Routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
const handler: express.ErrorRequestHandler = (
  err: Error | TenetError,
  req: express.Request,
  res: express.Response,
  // The existence of the next parameter fixes errors not returned as JSONs.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction
): void => {
  console.log(err.message);
  console.log(err.stack);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = isDev ? err : {};

  // TenetErrors always carry a status but,
  // if a normal Error is thrown, it might not come with a status.
  let status = DEFAULT_ERROR_HTTP_STATUS_CODE;
  if ('status' in err) {
    status = err.status;
  }

  // Build the stackTrace, only for development
  const response = { errorMessage: err.message, status, stackTrace: undefined };
  if (isDev) response.stackTrace = [...err.stack.split(/\r?\n/)];

  // Render the error page
  res.setHeader('Content-Type', 'application/json');
  res.status(status);
  res.json(response);
};
app.use(handler);

export default app;
