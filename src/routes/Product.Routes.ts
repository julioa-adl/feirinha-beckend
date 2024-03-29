import { Router } from 'express';
import ProductController from '../controllers/Product.Controller';
import mdwsProd from '../middlewares/Product.Middleware';
import mdwsUser from '../middlewares/User.Middleware';
import mdwsToken from '../middlewares/Token.Middleware';

const productRouter = Router();
const productController = new ProductController();

productRouter
  .get('/', mdwsToken.validateUserToken, productController.getAll)
  .get('/:id', mdwsToken.validateUserToken, productController.getOneById)
  .post('/',mdwsToken.validateUserToken, mdwsProd.validCreateProd, productController.create)
  .put('/', mdwsToken.validateUserToken, productController.update)
  .delete('/', mdwsUser.validAdmin, productController.delete)

export default productRouter;