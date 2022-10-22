import { getPrisma } from "@/db/prisma";

import UserRepository from "@/modules/User/repositories/UserRepository";

import AuthUserUseCase from "./AuthUserUseCase";
import AuthUserController from "./AuthUserController";

export default async function AuthUser() {
  const prisma = await getPrisma();

  const authUserRepository = new UserRepository(prisma);
  const authUserUseCase = new AuthUserUseCase(authUserRepository);
  const authUserController = new AuthUserController(authUserUseCase);

  return { authUserUseCase, authUserController };
}
