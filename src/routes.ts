import { Router } from "express";

import { CreateBirthdayController } from "./controllers/Birthdays/CreateBirthdayController";
import { ListAllBirthdaysController } from "./controllers/Birthdays/ListAllBirthdaysController";
import { EditBirthdayNameController } from "./controllers/Birthdays/EditBirthdayNameController";
import { EditBirthdayDateController } from "./controllers/Birthdays/EditBirthdayDateController";
import { DeleteBirthdayController } from "./controllers/Birthdays/DeleteBirthdayController";

const routes = Router();

routes.post("/birthdays", new CreateBirthdayController().handle);
routes.get("/birthdays", new ListAllBirthdaysController().handle);
routes.put("/birthdays/edit-name", new EditBirthdayNameController().handle);
routes.put("/birthdays/edit-date", new EditBirthdayDateController().handle);
routes.delete("/birthdays", new DeleteBirthdayController().handle);

export { routes };
