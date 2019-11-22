import { Seeder } from 'mongo-seeding';
import * as path from 'path';


const seedDB = async (mongoUri: string, collectionsPath: string) => {
  const config = {
    database: mongoUri,
    dropDatabase: true,
    dropCollections: false
  };

  // collectionReadingOptions: https://github.com/pkosiec/mongo-seeding/tree/master/core
  const collectionReadingOptions = {
    extensions: ['ts', 'js', 'json'],
    transformers: []
  };

  const seeder = new Seeder(config);
  const collections = seeder.readCollectionsFromPath(path.resolve(collectionsPath), collectionReadingOptions);

  try {
    await seeder.import(collections);
    return true;
  } catch (err) {
    // Handle errors
    // eslint-disable-next-line no-console
    console.log(`*** Error seeding DB: ${err}`);
    return false;
  }
};

export default seedDB;
