import "dotenv/config";
import { MongoClient } from "mongodb";

const { MONGODB_URL, MONGODB_NAME } = process.env;

export async function connectToDb() {
	try {
		const client = await MongoClient.connect(MONGODB_URL);

		const db = client.db(MONGODB_NAME);

		return { client, db };
	} catch (e) {
		console.log(e);
	}
}
