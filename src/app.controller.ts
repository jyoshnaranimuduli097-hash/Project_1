import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Roles } from './common/decorators/role.decorator.js';
import { Role } from './common/enum/role.enum.js';
import { RoleGuard } from './common/guard/role/role.guard.js';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(RoleGuard)
  // @Roles(Role.Admin,Role.User)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
