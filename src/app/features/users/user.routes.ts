import { Router } from "express";
import { UserController } from "./controller/user.controller";

export default () => {
  const router = Router();

  const userController = new UserController();

  router.get("/", userController.getAll);
  router.get("/:id", userController.getUserById);
  router.post("/", userController.createUser);
  router.put("/:id", userController.updateUser);
  router.delete("/:id", userController.deleteUser);

  return router;
};
