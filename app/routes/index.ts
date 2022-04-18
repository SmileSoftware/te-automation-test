import express from 'express';

import { getSnippets } from '../../modules/snippets/snippetMethodsBase';
import { ClientErrorInterface } from '../../modules/util/clientErrors';
import { restErrorHandler } from '../../modules/util/restErrorHandler';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'REST service.' });
});


router.get('/snippetGroup/:groupId/snippets', async (req, res, next): Promise<express.Response|void> => {
  res.locals.currentMethod = 'snippetGroup.getSnippets';
  const errorHandler = (error: ClientErrorInterface, message?: string, logOnly = false) => restErrorHandler({
    error,
    message,
    method: res.locals.currentMethod,
    userId: res.locals.userId,
    userAgent: res.locals.userAgent,
    context: null,
    logOnly
  });

  const groupId = req.params.groupId;
  let result = {};

  try {
    result = await getSnippets({
      userId: res.locals.userId,
      groupId,
      errorHandler
    });
  } catch (err) {
    return next(err);
  }
  return res.json(result);
});


export default router;
