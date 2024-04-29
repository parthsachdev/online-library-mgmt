import mongoose from 'mongoose';
import config from 'config';

export async function init() {
	await mongoose.connect(config.get('mongo.connectionString'));
	console.log('Connected to mongo');
}
