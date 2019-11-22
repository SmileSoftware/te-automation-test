import connection from '../db/db';
import clientErrors, { ClientErrorInterface } from '../util/clientErrors';


const userCanAccessSnippetGroup = async (userId: string, snippetGroupId): Promise<boolean> => {
  const conn = await connection;

  // Check to see if the user is a member of the group
  let canAccess = (await conn.db.collection('snippetGroups').countDocuments({ _id: snippetGroupId, 'members.userId': userId }) > 0);
  if (!canAccess) {
    // If not a group member, check to see if the user is subscribed to the group
    canAccess = (await conn.db.collection('users').countDocuments({ _id: userId, subscribedSnippetGroupIds: snippetGroupId }) > 0);
  }
  return canAccess;
};

async function getSnippets(
  {
    userId,
    groupId,
    previousRevisionId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    apiVersion,
    errorHandler
  }: {
    userId: string;
    groupId: string;
    previousRevisionId: number;
    apiVersion: number;
    errorHandler: (error: ClientErrorInterface, message?: string) => void;
  }
) {
  if (!groupId || typeof (groupId) !== 'string') {
    errorHandler(clientErrors.invalidGroupId);
  }

  if (await userCanAccessSnippetGroup(userId, groupId) === false) {
    errorHandler(clientErrors.invalidUserForGroup);
  }
  const date = new Date(previousRevisionId);
  const conn = await connection;

  return conn.db.collection('snippets').find({
    groupId,
    dateUpdated: {
      $gt: date
    }
  }).toArray();
}

export { getSnippets }; // eslint-disable-line import/prefer-default-export
