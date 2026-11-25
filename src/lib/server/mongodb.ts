import { MONGODB_URI } from '$app/env/private';
import { MongoClient } from 'mongodb';

if (!MONGODB_URI) {
  throw new Error('Missing MongoDB connection string');
}

export const client = new MongoClient(MONGODB_URI);
export const db = client.db('afterlight');