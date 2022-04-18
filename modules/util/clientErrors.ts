export interface ClientErrorInterface {
  key: string;
  description: string;
  level?: string;
  httpStatusCode?: number;
}

const clientErrors = {
  userIdUndefined: {
    httpStatusCode: 400,
    key: 'userIdUndefined',
    description: 'The connection userId is undefined'
  },
  parameterMissing: {
    httpStatusCode: 400,
    key: 'parameterMissing',
    description: 'A required parameter was not provided'
  },
  databaseError: {
    httpStatusCode: 500,
    key: 'databaseError',
    description: 'An error occurred during a database operation'
  },
  idUndefined: {
    httpStatusCode: 400,
    key: 'idUndefined',
    description: 'The id field was not specified.'
  },
  groupIdUndefined: {
    httpStatusCode: 400,
    key: 'groupIdUndefined',
    description: 'The groupId field was not specified'
  },
  idAlreadyExistsForUser: {
    httpStatusCode: 409,
    key: 'idAlreadyExistsForUser',
    description: 'The user already has an item with this id in the database'
  },
  idAlreadyExists: {
    httpStatusCode: 409,
    key: 'idAlreadyExists',
    description: 'An item with this id already exists in the database'
  },
  idAlreadyExistsForGroup: {
    httpStatusCode: 409,
    key: 'idAlreadyExistsForGroup',
    description: 'A snippet with this ID already exists in this group'
  },
  groupTypeAlreadyExists: {
    httpStatusCode: 409,
    key: 'groupTypeAlreadyExists',
    description: 'A group of this type already exists for this user'
  },
  invalidId: {
    httpStatusCode: 404,
    key: 'invalidId',
    description: 'The provided id does not exist in the database'
  },
  invalidGroupId: {
    httpStatusCode: 403,
    key: 'invalidGroupId',
    description: 'The provided group id does not match the group id for the snippet'
  },
  invalidUserForGroup: {
    httpStatusCode: 401,
    key: 'invalidUserForGroup',
    description: 'This user does not have access to the group'
  },
  invalidUserRole: {
    httpStatusCode: 401,
    key: 'invalidUserRole',
    description: 'This user does not have editing permission on this group'
  },
  itemIsDeleted: {
    httpStatusCode: 409,
    key: 'itemIsDeleted',
    description: 'The item has been deleted'
  },
  groupIsDeleted: {
    httpStatusCode: 409,
    key: 'groupIsDeleted',
    description: 'The snippet group has been deleted'
  },
  dateUpdatedUndefined: {
    httpStatusCode: 400,
    key: 'dateUpdatedUndefined',
    description: 'The dateUpdated field was not specified.'
  },
  invalidDateUpdated: {
    httpStatusCode: 400,
    key: 'invalidDateUpdated',
    description: 'The dateUpdated does not match the server value.'
  },
  clientAPIVersionTooNew: {
    httpStatusCode: 400,
    key: 'clientAPIVersionTooNew',
    description: 'The version of the client API is too new to be supported by the server.'
  },
  clientAPIVersionTooOld: {
    httpStatusCode: 400,
    key: 'clientAPIVersionTooOld',
    description: 'The version of the client API is too old to be supported by the server.',
    level: 'debug'
  },
  invalidOperationForGroupState: {
    httpStatusCode: 400,
    key: 'invalidOperationForGroupState',
    description: 'The operation cannot be performed on a group with this groupState'
  },
  invalidAction: {
    httpStatusCode: 400,
    key: 'invalidAction',
    description: 'The action (for URL) does not exist'
  },
  subscriptionKeyUndefined: {
    httpStatusCode: 400,
    key: 'subscriptionKeyUndefined',
    description: 'The subscriptionKey was not specified.'
  },
  invalidSubscriptionKey: {
    httpStatusCode: 400,
    key: 'invalidSubscriptionKey',
    description: 'The subscriptionKey does not exist.'
  },
  lockedSubscriptionKey: {
    httpStatusCode: 200,
    key: 'lockedSubscriptionKey',
    description: 'The subscriptionKey has been locked.'
  },
  subscriptionKeyAlreadyExists: {
    httpStatusCode: 409,
    key: 'subscriptionKeyAlreadyExists',
    description: 'The subscriptionKey already exists for a group.'
  }
};

export default clientErrors;
