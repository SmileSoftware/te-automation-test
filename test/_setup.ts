import * as mongoose from 'mongoose';

process.env.NODE_ENV = 'test';

afterAll(async () => {
  await mongoose.disconnect();
});
