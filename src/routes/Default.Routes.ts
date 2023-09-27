import { Router } from 'express';
import FeirinhaController from '../controllers/Feirinha.Controller';

const defaultRouter = Router();
const defaultController = new FeirinhaController();

defaultRouter
.get('/', defaultController.default)

export default defaultRouter;