import { getUserDocument, getUserDocuments, query, uploadFile } from '../controllers/documents';
import { Router } from 'express';
import { isAuthenticated } from '../middleware';

export default (router: Router) => {
  router.post('/documents/upload', isAuthenticated, uploadFile);
  router.post('/documents/query', isAuthenticated, query);
  router.get('/documents/:id', isAuthenticated, getUserDocument);
  router.get('/documents', isAuthenticated, getUserDocuments);
};
