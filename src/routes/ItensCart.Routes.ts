/* eslint-disable max-len */
import { Router } from 'express';
import FeirinhaController from '../controllers/Feirinha.Controller';
import mdwsToken from '../middlewares/Token.Middleware';
import mdwsUser from '../middlewares/User.Middleware';

const itensCartRouter = Router();
const feirinhaController = new FeirinhaController();

itensCartRouter
  .post('/:userId', mdwsToken.validateUserToken, mdwsUser.validateUser, feirinhaController.addItemToList)
  .put('/:userId', mdwsToken.validateUserToken, mdwsUser.validateUser, feirinhaController.updateItemInList)
  .delete('/:userId', mdwsToken.validateUserToken, mdwsUser.validateUser, feirinhaController.removeItemFromList)

export default itensCartRouter;
