/* eslint-disable no-console */
import { getClientFromUserAgent } from './userAgentHandler';
import { ClientErrorInterface } from './clientErrors';
import { TenetError } from './tenetError';

const DEFAULT_ERROR_LEVEL = 'error';

interface ErrorHandlerInterface {
  error: ClientErrorInterface;
  method: string;
  userId: string;
  userAgent: string;
  message?: string;
  context?: object;
  extraData?: object;
  logOnly?: boolean;
}

const restErrorHandler = ({
  error,
  method,
  userId,
  userAgent,
  message,
  extraData,
  logOnly = false
}: ErrorHandlerInterface): void => {
  const client = getClientFromUserAgent(userAgent);
  const msg = message || error.description || 'Unknown Error';

  let errorString = `API: ${method} - ${error.key}`;
  if (msg) {
    errorString += ` - [${msg}]`;
  }
  if (userId) {
    errorString += ` - ${userId}`;
  }
  if (client) {
    errorString += ` - ${client}`;
  }
  console.log(errorString, extraData);

  if (!logOnly) {
    // If logOnly is specified, we just want to log the error, not throw
    const httpStatusCode = error.httpStatusCode || null;
    throw new TenetError(error.key, httpStatusCode);
  }
};

export { restErrorHandler, DEFAULT_ERROR_LEVEL };
