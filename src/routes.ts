import { Router } from "express";

import { CreateBirthdayController } from "./controllers/Birthdays/CreateBirthdayController";
import { ListAllBirthdaysController } from "./controllers/Birthdays/ListAllBirthdaysController";
import { EditBirthdayNameController } from "./controllers/Birthdays/EditBirthdayNameController";
import { EditBirthdayDateController } from "./controllers/Birthdays/EditBirthdayDateController";
import { DeleteBirthdayController } from "./controllers/Birthdays/DeleteBirthdayController";
import { ListBirthdaysByDateController } from "./controllers/Birthdays/ListBirthdaysByDateController";
import { SendHappyBirthdaysController } from "./controllers/Birthdays/SendHappyBirthdaysController";

import { hasPermission } from "./middlewares/HasPermission";

const routes = Router();

routes.use(hasPermission);

routes.post("/birthdays", new CreateBirthdayController().handle);
routes.post(
	"/birthdays/list-by-date",
	new ListBirthdaysByDateController().handle
);

routes.get("/birthdays", new ListAllBirthdaysController().handle);
routes.get("/birthdays/send", new SendHappyBirthdaysController().handle);

routes.put("/birthdays/edit-name", new EditBirthdayNameController().handle);
routes.put("/birthdays/edit-date", new EditBirthdayDateController().handle);

routes.delete("/birthdays", new DeleteBirthdayController().handle);

export { routes };
