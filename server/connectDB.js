
import { MongoClient } from 'mongodb';
export async function connectDB() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  await client.connect();

  const database = client.db("db_amazon");
  const collection = database.collection("reviews2");

  return { client, database, collection };
}
