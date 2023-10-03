import { Router } from 'express';
import FeirinhaController from '../controllers/Feirinha.Controller';
import mdwsToken from '../middlewares/Token.Middleware';

const defaultRouter = Router();
const defaultController = new FeirinhaController();

defaultRouter
  .get('/', defaultController.default)
  .post('/relavidate', mdwsToken.validateToken)

export default defaultRouter;