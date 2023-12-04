import { HttpException, HttpStatus } from '@nestjs/common';

type Entity = 'Movie' | 'User' | 'Role';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Exception {
  export class NotFoundException extends HttpException {
    constructor(entity: Entity) {
      const message = `${entity} with this details was not found`;

      super(message, HttpStatus.NOT_FOUND);
    }
  }

  export class BadRequestException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.BAD_REQUEST);
    }
  }

  export class AlreadyExistsException extends BadRequestException {
    constructor(entity: Entity) {
      const message = `${entity} with provided data already exists`;

      super(message);
    }
  }

  export class ForbiddenException extends HttpException {
    constructor() {
      super('This is forbidden', HttpStatus.FORBIDDEN);
    }
  }

  export class InternalServerErrorException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  export class UndefinedServerErrorException extends InternalServerErrorException {
    constructor(action = '') {
      const message = `Error occured ${action}`;

      super(message);
    }
  }
}

export default Exception;
