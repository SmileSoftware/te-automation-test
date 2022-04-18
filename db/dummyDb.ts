import usersData from './users';
import snippetGroupData from './snippetGroup';
import snippetData from './snippets';

const DB = {
  findUserByHashedToken: ((hashedToken: string) => {
    const user = usersData.find((u) => {
      const loginTokens = u.services.resume.loginTokens;
      return loginTokens.find((t) => t.hashedToken === hashedToken);
    });
    return user;
  }),

  findSnippetGroupById: ((snippetGroupId: string) => snippetGroupData.find((group) => group._id === snippetGroupId)),

  userCanAccessSnippetGroup: ((userId: string, snippetGroupId: string): boolean => {
    let canAccess = false;
    const group = DB.findSnippetGroupById(snippetGroupId);
    if (group) {
      const member = group.members.find((m) => m.userId === userId);
      if (member) {
        canAccess = true;
      }
      canAccess = true;
    }
    return canAccess;
  }),

  findSnippetsBySnippetGroupId: ((snippetGroupId: string) => {
    const snippets = snippetData.filter((snippet) => snippet.groupId === snippetGroupId);
    return snippets;
  })
};

export default DB;
