import * as mongoose from 'mongoose';

// As "connection" is in the global scope, Lambda may retain it between
// function calls thanks to "callbackWaitsForEmptyEventLoop" in the serverless.ts file.

const mongoEnvURL = process.env.MONGO_URL || '';

const getConnectionFromURL = async (url: string) => mongoose.createConnection(url, {
  // Buffering means mongoose will queue up operations if it gets
  // disconnected from MongoDB and send them when it reconnects.
  // With serverless, better to fail fast if not connected.
  bufferCommands: false, // Disable mongoose buffering
  bufferMaxEntries: 0, // and MongoDB driver buffering
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // Make Mongoose use Mongo's findOneAndUpdate() - https://mongoosejs.com/docs/deprecations.html#-findandmodify-
  autoIndex: false
});

const getConnection = async (url: string) => {
  if (!url) {
    throw new Error('MONGO_URL is not defined.');
  }

  let mongoURL = url;
  if (!mongoURL) {
    throw new Error('MongoURL is empty.');
  }
  return getConnectionFromURL(mongoURL);
};

const connection = getConnection(mongoEnvURL);
export default connection;
