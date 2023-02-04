import { HttpStatus } from "@nestjs/common/enums";
import { HttpException,  } from "@nestjs/common/exceptions";

export class NotFoundError extends HttpException {
  constructor(readonly message: string){
    super(message, HttpStatus.NOT_FOUND)

  }
}

export class AccessDeniedError extends HttpException {
  constructor(readonly message: string){
    super(message, HttpStatus.FORBIDDEN)

  }
}

export class BadRequestError extends HttpException {
  constructor(readonly message: string){
    super(message, HttpStatus.BAD_REQUEST)

  }
}