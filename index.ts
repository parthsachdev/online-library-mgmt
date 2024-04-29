import express, {Express} from 'express';
import {router} from './src/router';
import { NextFunction, Request, Response } from "express";
import config from 'config';
import * as mongo from './src/mongo';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(`Request received for ${req.method} ${req.url}`);
	next();
});
app.use('/', router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(`Error occurred on action ${req.action}. Error: ${err}`);
	return res.status(500).send('Internal server error');
});

app.listen(config.get('server.port'), async () => {
	await mongo.init();
	console.log('Server is running');
});

