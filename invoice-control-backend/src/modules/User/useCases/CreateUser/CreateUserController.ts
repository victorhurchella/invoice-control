import { HttpExceptionEnum } from "@/exceptions";
import ValidationException from "@/exceptions/ValidationException";
import { registerSchema } from "@/models/joi";
import { Request, Response } from "express";
import CreateUserUseCase from "./CreateUserUseCase";

export default class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response | void> {
    const { error } = registerSchema.validate(request.body);

    if (error)
      throw new ValidationException(
        HttpExceptionEnum.VALIDATION_EXCEPTION,
        error.details
      );

    const { id } = await this.createUserUseCase.execute(request.body);

    return response.status(201).json({ success: true, id });
  }
}
