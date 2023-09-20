import { signUp, signIn } from '../controllers/authentication';
import { Router } from 'express';

export default (router: Router) => {
  router.post('/auth/signup', signUp);
  router.post('/auth/signin', signIn);
};
