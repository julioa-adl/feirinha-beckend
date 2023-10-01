/* eslint-disable no-console */
import 'dotenv/config';
import app from './app';
import connectToDatabase from './config/Connection';
import cors from 'cors';

const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cors());

const PORT = process.env.PORT || 3001;
connectToDatabase()
app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));