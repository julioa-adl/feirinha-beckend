import { Router } from 'express';
import FeirinhaController from '../controllers/Feirinha.Controller';
import mdwsToken from '../middlewares/Token.Middleware';
import mdwsUser from '../middlewares/User.Middleware';

const feirinhaRouter = Router();
const feirinhaController = new FeirinhaController();

feirinhaRouter
  .get('/', mdwsToken.validateUserToken, feirinhaController.getAll)
  .get('/:userId', mdwsToken.validateUserToken, mdwsUser.validateUser,
      feirinhaController.getByUserId)
  .get('/statistic/:prodId', mdwsToken.validateUserToken, feirinhaController.getAllByProductId)
  .post('/:userId', mdwsToken.validateUserToken, mdwsUser.validateUser, feirinhaController.create)
  .put('/:userId', mdwsToken.validateUserToken, mdwsUser.validateUser, feirinhaController.update)
  .delete('/:userId', mdwsToken.validateUserToken, mdwsUser.validateUser, feirinhaController.delete)

export default feirinhaRouter;