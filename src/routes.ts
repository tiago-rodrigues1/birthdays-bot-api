import { Request, Response, Router } from "express";
import { CreateBirthdayController } from "./controllers/CreateBirthdayController";

const routes = Router();

routes.post("/birthdays", new CreateBirthdayController().handle);

export { routes };
