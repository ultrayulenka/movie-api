import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/user/user.model';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { AuthService } from './auth.service';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const user = this.authService.validateAuthHeader(authHeader);

      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'User is unauthorized' });
    }
  }
}

@Injectable()
class WsAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const socket = context.switchToWs().getClient<Socket & { user: User }>();

    try {
      const authHeader = socket.handshake.headers.authorization;
      const user = this.authService.validateAuthHeader(authHeader);

      socket.user = user;

      return true;
    } catch (error) {
      throw new WsException({ message: 'User is unauthorized' });
    }
  }
}

export { AuthGuard, WsAuthGuard };
