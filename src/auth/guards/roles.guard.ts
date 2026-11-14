import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //if no roles required

    if (!requiredRoles) {
      return true;
    }

    //request object

    const request: Request = context.switchToHttp().getRequest();

    //authenticated user

    const user = request.user as {
      wallet: string;
      role: Role;
    };

    //compare roles

    return requiredRoles.includes(user.role);
  }
}
