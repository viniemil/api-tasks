import { Express } from "express";
import { ValidateUserMiddleware } from "./middlewares/validateUser";
import { ValidateUserEmailMiddleware } from "./middlewares/validadeUserEmail";
import { UserController } from "./controllers/user.controller";
import { TaskController } from "./controllers/task.controller";

export default (app: Express) => {
  const userController = new UserController();
  const taskController = new TaskController();

  app.post(
    "/user",
    new ValidateUserEmailMiddleware().validateUserEmail,
    userController.createUser
  );
  app.get("/user", userController.getAll);
  app.get(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    userController.getUserById
  );
  app.put(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    userController.updateUser
  );
  app.delete(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    userController.deleteUser
  );

  app.post("/user/:id/tasks", taskController.createTask);
  app.get("/user/:userId/tasks/:id", taskController.findTaskById);
  app.put("/user/:userId/tasks/:id", taskController.update);

  app.put("/user/:userId/tasks/:id/archived", taskController.archiveTask);
  app.delete("/user/:userId/tasks/:id", taskController.deleteTask);
};
