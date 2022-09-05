import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/user.model';

export const UserParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
