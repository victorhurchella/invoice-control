import ValidationException from "@/exceptions/ValidationException";
import { loginSchema } from "@/models/joi";
import { Request, Response } from "express";
import { AuthExceptionEnum } from "@/exceptions";
import AuthUserUseCase from "./AuthUserUseCase";

export default class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {
    this.authUserUseCase = authUserUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response | void> {
    const { error } = loginSchema.validate(request.body);

    if (error)
      throw new ValidationException(
        AuthExceptionEnum.VALIDATION_EXCEPTION,
        error.details
      );

    const { login, password } = request.body;

    const user = await this.authUserUseCase.execute(login.toLowerCase());
    const tokenData = await this.authUserUseCase.matchUser(user, password);

    return response.status(200).json(tokenData);
  }
}
