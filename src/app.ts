import 'module-alias/register';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import { keys } from './config';
import path from 'path';

export default class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.setDatabases();
		this.setAppConfig();
	}

	private setAppConfig(): void {
		this.app.use(bodyParser.json());
		this.app.use(cors());
		this.app.use('/api/v1', routes);
		this.app.get('/', (req, res) => {
			console.log('App works');
			res.send({ app: 'works' });
		});
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use('/public', express.static(path.join(__dirname, 'public')));
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
