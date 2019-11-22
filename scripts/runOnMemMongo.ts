#!/usr/bin/env node
// Copyright 2019 SmileOnMyMac, LLC dba Smile.

import * as childProcess from 'child_process';
import * as url from 'url';
import { MongoMemoryServer } from 'mongodb-memory-server';
import seedDB from '../modules/db/dbseeder';

const collectionsPath = './data';

const COMMAND = process.env.COMMAND || 'npm run jest';
const PWD = `${__dirname}/../`;

// eslint-disable-next-line no-console
console.log(`Using MONGO_URL: ${process.env.MONGO_URL}`);
// eslint-disable-next-line no-console
console.log(`Using COMMAND: ${COMMAND}`);

const getMongoMemoryServer = async (mongoURI: string): Promise<MongoMemoryServer> => {
  const urlParts = url.parse(mongoURI);
  const dbName = urlParts.path.replace('/', '').replace('?', '');
  // eslint-disable-next-line no-console
  console.log(`Creating server in: ${urlParts.hostname}:${urlParts.port}/${dbName}`);

  const mongoMemServer = await new MongoMemoryServer({
    instance: {
      ip: urlParts.hostname, // '127.0.0.1', // by default '127.0.0.1', for binding to all IP addresses set it to `::,0.0.0.0`,
      port: Number(urlParts.port),
      dbName,
      storageEngine: 'ephemeralForTest', // by default `ephemeralForTest`, available engines: [ 'devnull', 'ephemeralForTest', 'mmapv1', 'wiredTiger' ]
      debug: false // by default false
    }
  });
  return mongoMemServer;
};


const main = async () => {
  let mongoServer;
  let mongoUri;

  try {
    mongoServer = await getMongoMemoryServer(process.env.MONGO_URL);
    mongoUri = await mongoServer.getConnectionString();
    // eslint-disable-next-line no-console
    console.log(`*** MongoDB started at: ${mongoUri}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`Error getting Mongo Server Running: ${error}`);
  }
  // eslint-disable-next-line no-console
  console.log(`*** Seeding database from ${collectionsPath}`);
  await seedDB(mongoUri, collectionsPath);

  const child = childProcess.exec(COMMAND, {
    cwd: PWD
  });

  child.stdout.on('data', (data) => {
    process.stdout.write(data);
  });
  child.stderr.on('data', (data) => {
    process.stdout.write(data);
  });
  child.on('close', async (exitCode) => {
    await mongoServer.stop();
    // eslint-disable-next-line no-console
    console.log(`*** Exiting with exit code ${exitCode}`);
    process.exit(exitCode);
  });
};

main();
