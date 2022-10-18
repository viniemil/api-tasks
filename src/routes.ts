import { Express } from "express";
import { CreateNewTaskController } from "./controllers/tasks/createTask";
import { GetUserController } from "./controllers/users/getUserById";
import { GetTaskController } from "./controllers/tasks/getTasksById";
import { EditTaskController } from "./controllers/tasks/editTask";
import { DeleteTaskController } from "./controllers/tasks/deleteTask";
import { CreateNewuser } from "./controllers/users/createUser";
import { GetAllUsersController } from "./controllers/users/getAllUsers";
import { EditUserController } from "./controllers/users/editUser";
import { DeleteUserController } from "./controllers/users/deleteUser";
import { BalanceTransactionController } from "./controllers/tasks/getTasks";
import { ValidateUserMiddleware } from "./middlewares/validateUser";
import { validateTaskMiddlewares } from "./middlewares/validateTask";
import { ValidateUserEmailMiddleware } from "./middlewares/validadeUserEmail";

export default (app: Express) => {
  app.post(
    "/user",
    new ValidateUserEmailMiddleware().validateUserEmail,
    new CreateNewuser().createUser
  );
  app.get("/user", new GetAllUsersController().getAll);
  app.get(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    new GetUserController().getUserById
  );
  app.put(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    new EditUserController().editUser
  );
  app.delete(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    new DeleteUserController().deleteUser
  );

  app.post(
    "/user/:id/tasks",
    new ValidateUserMiddleware().validateUser,
    new CreateNewTaskController().createTask
  );
  app.get(
    "/user/:userId/tasks/:id",
    new ValidateUserMiddleware().validateUser,
    new validateTaskMiddlewares().validateTask,
    new GetTaskController().getTask
  );
  app.put(
    "/user/:userId/tasks/:id",
    new ValidateUserMiddleware().validateUser,
    new validateTaskMiddlewares().validateTask,
    new EditTaskController().ediTask
  );
  app.delete(
    "/user/:userId/tasks/:id",
    new validateTaskMiddlewares().validateTask,
    new ValidateUserMiddleware().validateUser,
    new DeleteTaskController().deleteTask
  );

  app.get(
    "/user/:userId/tasks",
    new ValidateUserMiddleware().validateUser,
    new BalanceTransactionController().GetbalanceTransaction
  );
};
