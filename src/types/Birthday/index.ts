import { ObjectId } from "mongodb";

export type Birthday = {
	_id: ObjectId;
	email: string;
	name: string;
	date: string;
};
