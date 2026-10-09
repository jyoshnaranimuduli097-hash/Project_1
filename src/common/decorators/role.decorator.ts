import { Role } from "../enum/role.enum.js";
import { SetMetadata } from "@nestjs/common";

export const  ROLE_SECRET_KEY = 'roles'
export const Roles = (...roles : Role[])=>{
    return SetMetadata(ROLE_SECRET_KEY,roles)
}