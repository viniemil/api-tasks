import { Express } from "express";
import usersRoutes from "../../app/features/users/user.routes";
import tasksRoutes from "../../app/features/tasks/task.routes";

export default (app: Express) => {
  app.get("/", (request, response) => response.status(200).send("API RODANDO"));

  app.use("/users", usersRoutes());
  app.use("/tasks", tasksRoutes());
};
