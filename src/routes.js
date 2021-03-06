import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});
routes.post('/users', UserController.store);

export default routes;
