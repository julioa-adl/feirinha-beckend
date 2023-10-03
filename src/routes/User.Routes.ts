import { Router } from 'express';
import UserController from '../controllers/User.Controller';
import mdwsUser from '../middlewares/User.Middleware';
import mdwsToken from '../middlewares/Token.Middleware';

const userRouter = Router();
const userController = new UserController();

userRouter
  .get('/', mdwsUser.validAdmin, userController.getUsers)
  .post('/', mdwsUser.validateRegister, userController.create)
  .put('/', mdwsToken.validateUserToken, mdwsUser.validateUser, userController.update)
  .delete('/', mdwsToken.validateUserToken, mdwsUser.validateUser,userController.delete);

export default userRouter;
