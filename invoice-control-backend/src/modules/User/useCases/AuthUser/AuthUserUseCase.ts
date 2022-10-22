import ValidationException from "@/exceptions/ValidationException";
import UserRepository from "@/modules/User/repositories/UserRepository";
import generateJWT from "@/utils/jwt";
import { User } from "@prisma/client";
import argon2id from "argon2";
import { AuthExceptionEnum } from "@/exceptions";
import UnauthorizedException from "@/exceptions/UnauthorizedException";

export default class AuthUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(login: string) {
    return this.userRepository.authenticate(login);
  }

  public async matchUser(
    user: User | null,
    password: string
  ): Promise<{ token: string; expires: string | undefined }> {
    if (!user)
      throw new UnauthorizedException(AuthExceptionEnum.INVALID_CREDENTIALS);

    const passMatch = await argon2id.verify(user.password, password);
    if (!passMatch)
      throw new UnauthorizedException(AuthExceptionEnum.INVALID_CREDENTIALS);

    return generateJWT(user.id);
  }
}
