/* eslint-disable no-console */
import 'dotenv/config';
import app from './app';
import connectToDatabase from './config/Connection';

const PORT = process.env.PORT || 3001;
connectToDatabase()
app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));