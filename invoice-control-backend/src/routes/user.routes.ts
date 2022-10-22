import CreateUser from "@/modules/User/useCases/CreateUser";
import AuthUser from "@/modules/User/useCases/AuthUser";
import { Router } from "express";

const userRouter = Router({ mergeParams: true });

userRouter.post("/register", async (request, response) => {
  const { createUserController } = await CreateUser();

  return createUserController.handle(request, response);
});

userRouter.post("/login", async (request, response) => {
  const { authUserController } = await AuthUser();

  return authUserController.handle(request, response);
});

export default userRouter;
