import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema.js';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:User.name,
        schema:userSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
