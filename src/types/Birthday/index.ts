import { ObjectId } from "mongodb";

export type Birthday = {
	_id: ObjectId;
	email: String;
	name: String;
	date: String;
};
