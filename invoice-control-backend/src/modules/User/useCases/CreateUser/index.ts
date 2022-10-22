import { getPrisma } from "@/db/prisma";

import UserRepository from "@/modules/User/repositories/UserRepository";

import CreateUserUseCase from "./CreateUserUseCase";
import CreateUserController from "./CreateUserController";

export default async function CreateUser() {
  const prisma = await getPrisma();

  const createUserRepository = new UserRepository(prisma);
  const createUserUseCase = new CreateUserUseCase(createUserRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return { createUserUseCase, createUserController };
}
