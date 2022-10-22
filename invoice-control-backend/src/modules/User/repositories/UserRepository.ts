import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit";
import { ICreateUserDTO } from "../useCases/CreateUser/CreateUserDTO";

export default class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(user: ICreateUserDTO) {
    return this.prisma.user.create({
      data: {
        ...user,
      },
    });
  }

  authenticate(login: string) {
    return this.prisma.user.findFirst({
      where: { email: login },
    });
  }

  async getByLogin(login: string) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { email: login },
    });

    return omit(user, ["password"]);
  }
}
