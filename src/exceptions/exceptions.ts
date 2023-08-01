import { HttpException, HttpStatus } from '@nestjs/common';

type Entity = 'Movie' | 'User' | 'Role';

class NotFoundException extends HttpException {
  constructor(entity: Entity) {
    const message = `${entity} with this email already exists`;

    super(message, HttpStatus.NOT_FOUND);
  }
}

class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

class AlreadyExistsException extends BadRequestException {
  constructor(entity: Entity) {
    const message = `${entity} with provided data already exists`;

    super(message);
  }
}

class ForbiddenException extends HttpException {
  constructor() {
    super('This is forbidden', HttpStatus.FORBIDDEN);
  }
}

class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

class UndefinedServerErrorException extends InternalServerErrorException {
  constructor(action = '') {
    const message = `Error occured ${action}`;

    super(message);
  }
}

export {
  NotFoundException,
  AlreadyExistsException,
  ForbiddenException,
  UndefinedServerErrorException,
};
