import { Router } from 'express';
import MarketController from '../controllers/Market.Controller';
import mdws from '../middlewares/User.Middleware';
import mktMiddleware from '../middlewares/Market.Middleware';
import mdwsToken from '../middlewares/Token.Middleware';

const marketRouter = Router();
const marketController = new MarketController();

marketRouter
  .get('/', mdwsToken.validateUserToken, marketController.getAll)
  .post('/', mdwsToken.validateUserToken, mktMiddleware.validCreateMarket, marketController.create)
  .put('/', mdwsToken.validateUserToken, marketController.update)
  .delete('/',mdws.validAdmin, marketController.delete);

export default marketRouter;
