
import * as mongoose from 'mongoose';
import * as url from 'url';

const BASE_DB = 'tenet-test';

// Sets process.env.MONGO_URL and Returns its value after adding the Test Suite suffix to the given database name in the mongoURI.
const getUniqueMongoURL = (mongoURI: string, testSuiteParam?: string): string => {
  if (mongoURI.endsWith(testSuiteParam)) {
    return mongoURI;
  }
  const urlParts = url.parse(mongoURI);
  let dbName = urlParts.path.replace('/', '');
  if (!dbName) {
    dbName = BASE_DB;
  }
  const testSuite = testSuiteParam || Math.random().toString(36).substring(2, 15);
  dbName = `${dbName}-${testSuite}`;

  process.env.MONGO_URL = `mongodb://${urlParts.hostname}:${urlParts.port}/${dbName}`;
  return process.env.MONGO_URL;
};


const dbConnect = async (mongoUri: string): Promise<void> => {
  const mongooseOpts = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // Make Mongoose use Mongo's findOneAndUpdate() - https://mongoosejs.com/docs/deprecations.html#-findandmodify-
    autoIndex: false
  };

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      // eslint-disable-next-line no-console
      console.log(`*** Mongoose connection to ${mongoUri} Timed out!`);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    // eslint-disable-next-line no-console
    console.log(e);
  });
  mongoose.connection.once('open', () => {
    // eslint-disable-next-line no-console
    // console.log(`*** Mngoose successfully connected to ${mongoUri}`);
  });
  try {
    await mongoose.connect(mongoUri, mongooseOpts);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`*** ERROR connecting Mongoose to ${mongoUri}`);
    throw e;
  }
};

const dbDisconnect = async (): Promise<void> => {
  await mongoose.disconnect();
};

export {
  dbDisconnect, dbConnect, getUniqueMongoURL
};
