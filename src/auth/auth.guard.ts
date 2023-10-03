import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/user/user.model';
import { Socket } from 'socket.io';
import { AuthService } from './auth.service';

class CommonAuthGuard {
  constructor(private authService: AuthService) {}

  handleRequest(
    client: any,
    authHeader: string,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const user = this.authService.validateAuthHeader(authHeader);

      client.user = user;
      return true;
    } catch (error) {
      //throw new UnauthorizedException({ message: 'User is unauthorized' });
    }
  }
}
@Injectable()
class AuthGuard extends CommonAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    return super.handleRequest(req, req.headers.authorization);
  }
}

@Injectable()
class WsAuthGuard extends CommonAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const socket = context.switchToWs().getClient<Socket & { user: User }>();

    console.log(socket.handshake.headers.authorization);
    console.log(socket.handshake);

    return super.handleRequest(socket, socket.handshake.headers.authorization);
  }
}

export { AuthGuard, WsAuthGuard };
