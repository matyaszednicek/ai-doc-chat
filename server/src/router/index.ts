import { Router } from 'express';
import authentication from './authentication';
import users from './users';
import documents from './documents';

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  documents(router);

  return router;
};
