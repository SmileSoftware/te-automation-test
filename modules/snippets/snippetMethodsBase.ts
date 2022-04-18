import DB from '../../db/dummyDb';
import clientErrors, { ClientErrorInterface } from '../util/clientErrors';


const userCanAccessSnippetGroup = (userId: string, snippetGroupId): boolean => {
  // Check to see if the user is a member of the group
  const canAccess = DB.userCanAccessSnippetGroup(userId, snippetGroupId);
  return canAccess;
};

async function getSnippets(
  {
    userId,
    groupId,
    errorHandler
  }: {
    userId: string;
    groupId: string;
    errorHandler: (error: ClientErrorInterface, message?: string) => void;
  }
) {
  if (!groupId || typeof (groupId) !== 'string') {
    errorHandler(clientErrors.invalidGroupId);
  }

  if (userCanAccessSnippetGroup(userId, groupId) === false) {
    errorHandler(clientErrors.invalidUserForGroup);
  }

  return DB.findSnippetsBySnippetGroupId(groupId);
}

export { getSnippets }; // eslint-disable-line import/prefer-default-export
