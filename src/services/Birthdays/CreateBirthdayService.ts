import { connectToDb } from "../MongoDb";

interface CreateBirthdayServiceProps {
	email: string;
	name: string;
	date: string;
}

export class CreateBirthdayService {
	async execute({ email, name, date }: CreateBirthdayServiceProps) {
		try {
			const connection = await connectToDb();
			const db = connection?.db;

			if (db) {
				const result = await db
					.collection("birthdays")
					.findOne({ email });

				if (result) {
					return new Error("Esse aniversariante já está cadastrado!");
				}

				const insertResponse = await db
					.collection("birthdays")
					.insertOne({ email, name, date });

				if (!insertResponse.insertedId) {
					return new Error(
						"Não foi possível cadastrar esse aniversariante"
					);
				}
			} else {
				return new Error(
					"Não foi possível cadastrar esse aniversariante"
				);
			}
		} catch (e) {
			return new Error(`${e}`);
		}
	}
}
