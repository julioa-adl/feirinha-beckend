/* eslint-disable no-console */
import mongoose from 'mongoose';
import 'dotenv/config';

const connectToDatabase = () => {
  console.log('Wait connecting to the database');

  mongoose.connect(
    // eslint-disable-next-line max-len
    'mongodb+srv://julioafmesquita:hmb9ErAmU84TV16E@cluster0.dimfshy.mongodb.net/?retryWrites=true&w=majority'
  ).then(() => console.log('MongoDB Atlas Connected')).catch((error) => console.log(error))
};

export default connectToDatabase;
