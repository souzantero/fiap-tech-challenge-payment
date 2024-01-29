import { App } from './app';
import { MongooseDatabase } from './databases/mongoose/mongoose-database';
import { environment } from './configuration/environment';

const mongooseDatabase = new MongooseDatabase(environment.databaseUrl);
mongooseDatabase.connect().then(() => {
  const app = App.create(mongooseDatabase);
  app.start(environment.port);
});
