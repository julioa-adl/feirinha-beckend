import express from 'express';
import userRouter from './routes/User.Routes';
import loginRouter from './routes/Login.Routes';
import marketRouter from './routes/Market.Routes';
import productRouter from './routes/Product.Routes';
import feirinhaRouter from './routes/Feirinha.Routes';
import itensCartRouter from './routes/ItensCart.Routes';
import recommendationRouter from './routes/Recommendation.Routes';
import defaultRouter from './routes/Default.Routes';
import cors from 'cors';

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/', defaultRouter)
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/market', marketRouter);
app.use('/product', productRouter);
app.use('/feirinha', feirinhaRouter);
app.use('/cart', itensCartRouter);
app.use('/recommendation', recommendationRouter);

export default app;
