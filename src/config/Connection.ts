/* eslint-disable no-console */
import mongoose from 'mongoose';

const connectToDatabase = () => {
  console.log('Wait connecting to the database');

  mongoose.connect(
    // eslint-disable-next-line max-len
    `mongodb+srv://${process.env.ATLAS_NAME}:${process.env.ATLAS_PASSWORD}@cluster0.dimfshy.mongodb.net/?retryWrites=true&w=majority`
  ).then(() => console.log('MongoDB Atlas Connected')).catch((error) => console.log(error))
};

export default connectToDatabase;
