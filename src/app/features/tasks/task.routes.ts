import { Router } from "express";
import { TaskController } from "./controller/task.controller";

export default () => {
  const router = Router();

  const taskController = new TaskController();

  router.get("/user/:userId", taskController.findAllTasksByUser);
  router.get("/:id", taskController.findTaskById);
  router.post("/:userId", taskController.createTask);
  router.delete("/:id", taskController.deleteTask);
  router.put("/:id", taskController.update);
  router.put("/:id/archived", taskController.archiveTask);

  return router;
};
