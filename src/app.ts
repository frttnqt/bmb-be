import 'module-alias/register';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';
import { keys } from './config';

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setDatabases();
    this.setAppConfig();
  }

  private setAppConfig(): void {
    this.app.use(bodyParser.json());
    this.app.use('/api/v1', routes);
    this.app.get('/', (req, res) => {res.send({app: 'works'})})
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private setDatabases(): void {
    mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  }
}
