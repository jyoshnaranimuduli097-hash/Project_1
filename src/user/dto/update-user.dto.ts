import { createUserDto } from "./create-user.dto.js";
import { PartialType } from '@nestjs/mapped-types';

export class updateUserDto extends PartialType(createUserDto) {}