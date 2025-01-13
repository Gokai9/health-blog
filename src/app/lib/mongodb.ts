// lib/mongodb.ts
import { MongoClient, Collection } from 'mongodb';
//import { Article } from '../types/dbtypes';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongodb URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getCollection<T>(collectionName: string): Promise<Collection<T>> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  return db.collection<T>(collectionName);
}

export default clientPromise;
