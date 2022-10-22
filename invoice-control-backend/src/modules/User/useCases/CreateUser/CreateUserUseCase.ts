import argon2id from "argon2";
import UserRepository from "@/modules/User/repositories/UserRepository";
import ValidationException from "@/exceptions/ValidationException";
import { HttpExceptionEnum } from "@/exceptions";
import { applyMaskPhone } from "@/utils/mask";
import { ICreateUserDTO } from "./CreateUserDTO";

export default class CreateUserUseCase {
  private userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ firstname, lastname, email, tel, password }: ICreateUserDTO) {
    try {
      const newUser = await this.userRepository.create({
        firstname,
        lastname,
        email,
        tel: applyMaskPhone(tel),
        password: await argon2id.hash(password),
      });

      return newUser;
    } catch (e: any) {
      throw new ValidationException(HttpExceptionEnum.BAD_REQUEST, {
        message: e.message,
      });
    }
  }
}
