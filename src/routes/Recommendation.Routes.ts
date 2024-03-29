import { Router } from 'express';
import RecommendationController from '../controllers/Recommendation.Controller';
import mdwsToken from '../middlewares/Token.Middleware';
import mdwsUser from '../middlewares/User.Middleware';

const recommendationRouter = Router();
const recommendationController = new RecommendationController();

recommendationRouter
  .get('/:productId', mdwsToken.validateUserToken, recommendationController.getByProductId)
  .post('/', mdwsToken.validateUserToken, recommendationController.create)
  .delete('/:userId', mdwsToken.validateUserToken, mdwsUser.validateUser,
          recommendationController.delete)

export default recommendationRouter;