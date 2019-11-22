export interface ServerErrorInterface {
  key: string;
  description: string;
  level?: string;
  httpStatusCode?: number;
}

const serverErrors = {
  invalidToken: {
    httpStatusCode: 400,
    key: 'invalidToken',
    description: 'The provided token is invalid.'
  },
  unauthorized: {
    httpStatusCode: 401,
    key: 'Unauthorized',
    description: 'Unauthorized.'
  }
};

export default serverErrors;
