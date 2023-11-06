import { Router } from 'express';
import FeirinhaController from '../controllers/Feirinha.Controller';
import mdwsToken from '../middlewares/Token.Middleware';
import mdwsUser from '../middlewares/User.Middleware';

const feirinhaRouter = Router();
const feirinhaController = new FeirinhaController();

feirinhaRouter
  .get('/', mdwsUser.validAdmin, feirinhaController.getAll)
  .get('/:userId', mdwsToken.validateUserToken, mdwsUser.validateUser,
        feirinhaController.getByUserId)
  .post('/:userId', mdwsToken.validateUserToken, mdwsUser.validateUser, feirinhaController.create)
  .delete('/:userId', mdwsToken.validateUserToken, mdwsUser.validateUser, feirinhaController.delete)

export default feirinhaRouter;