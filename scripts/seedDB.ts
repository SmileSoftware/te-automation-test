// WARNING!!! This script will drop the existing database specified in the MONGO_TEST_URL environment variable
// This script seeds the DB specified in the MONGO_TEST_URL environment variable with the data contained in collectionsPath
// The collections path must follow the format specified here: https://github.com/pkosiec/mongo-seeding/blob/master/docs/import-data-definition.md
// Examples can be found here: https://github.com/pkosiec/mongo-seeding/tree/master/examples
import seedDB from '../modules/db/dbseeder';

const collectionsPath = './data';

const main = async () => {
  await seedDB(process.env.MONGO_TEST_URL, collectionsPath);
};

main();
