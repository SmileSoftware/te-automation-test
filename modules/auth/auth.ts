import crypto from 'crypto';
import { TenetError } from '../util/tenetError';
import serverErrors from '../util/serverErrors';
import DB from '../../db/dummyDb';

const BEARER_HEADER = 'Bearer '; // Just in case the token comes with the Bearer header.

export const USER_RESUME_LOGIN_TOKEN_REGEXP = /^[a-zA-Z0-9_-]{43}$/;
export const USER_RESUME_LOGIN_HASHED_TOKEN_REGEXP = /^[a-zA-Z0-9+=/]{44}$/; // Used to validate incoming tokens prior to the hashing.


const hashLoginToken = async (loginToken) => {
  const hash = await crypto.createHash('sha256');
  hash.update(loginToken);
  return hash.digest('base64');
};

// Validates the given token and returns a sanitized version of it (removes the Bearer header).
const validateLoginToken = (givenToken: string): string => {
  let token = givenToken;
  // If the token comes in the form "Bearer: XXX", we need to remove the header.
  if (givenToken.startsWith(BEARER_HEADER)) {
    token = givenToken.substring(BEARER_HEADER.length);
  }
  // Check the unhashed token against our token regexp to sanitize the input.
  if (!USER_RESUME_LOGIN_TOKEN_REGEXP.test(token)) {
    throw new TenetError(serverErrors.invalidToken.key, serverErrors.invalidToken.httpStatusCode);
  }
  return token;
};

const validateAndHashSessionToken = async (givenToken: string): Promise<string> => {
  const token = validateLoginToken(givenToken);
  return hashLoginToken(token);
};


const getUserIdBySessionToken = async (givenToken: string): Promise<string> => {
  const hashedToken = await validateAndHashSessionToken(givenToken);
  const user = DB.findUserByHashedToken(hashedToken);
  if (!user) {
    throw new TenetError(serverErrors.unauthorized.key, serverErrors.unauthorized.httpStatusCode);
  }
  return user._id;
};

export {
  getUserIdBySessionToken, hashLoginToken, validateLoginToken
};
