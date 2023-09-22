import { Router } from 'express';
import userController from '../controllers/user-controller.js';
const routes = Router();
import { body } from 'express-validator';

routes.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 15 }),
  userController.registration,
);
routes.post('/login', userController.login);
routes.post('/logout', userController.logout);
routes.get('/activate/:link', userController.activate);
routes.get('/refresh', userController.refresh);
routes.get('/users', userController.getUsers);
routes.get('/test', (req, res) => res.json({ result: 'test' }));

export default routes;
