import BaseError from "./BaseError";
import { HttpExceptionEnum } from "./index";

export default class UnauthorizedException extends BaseError {
  public message: string;

  public errors: any;

  public status: number;

  constructor(message?: string, errors?: any, status = 401) {
    super(message);
    this.message = message || HttpExceptionEnum.UNAUTHORIZED;
    this.errors = errors || {};
    this.status = status || 500;
  }
}
