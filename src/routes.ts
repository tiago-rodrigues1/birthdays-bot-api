import { Router } from "express";

import { CreateBirthdayController } from "./controllers/Birthdays/CreateBirthdayController";
import { ListAllBirthdaysController } from "./controllers/Birthdays/ListAllBirthdaysController";
import { EditBirthdayNameController } from "./controllers/Birthdays/EditBirthdayNameController";

const routes = Router();

routes.post("/birthdays", new CreateBirthdayController().handle);
routes.get("/birthdays", new ListAllBirthdaysController().handle);
routes.put("/birthdays/edit-name", new EditBirthdayNameController().handle);

export { routes };
