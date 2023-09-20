import { isAuthenticated, isOwner } from '../middleware/index';
import { getAllUsers, deleteUser, updateUser, getUserKey } from '../controllers/users';
import { Router } from 'express';
import { Request, Response } from 'express';
import { getUserByUsername } from '../db/users';

export default (router: Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/users/:id', isAuthenticated, isAuthenticated, deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
  router.get('/users/:id/key', isAuthenticated, isOwner, getUserKey);
};
