import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../enum/role.enum.js';
import { ROLE_SECRET_KEY } from '../../decorators/role.decorator.js';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector : Reflector){}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_SECRET_KEY,[context.getHandler(),context.getClass()])
    console.log("requiredRoles ", requiredRoles)

    return true;
  }
}
