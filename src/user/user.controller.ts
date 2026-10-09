import { Controller, Get ,Post ,Param ,Body , Delete, Req, ParseIntPipe, Patch } from '@nestjs/common';
import { UserService } from './user.service.js';
import { createUserDto } from './dto/create-user.dto.js';
import { updateUserDto } from './dto/update-user.dto.js';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}
    @Get('health')
    checkHealth(){
        return {
            message : `Healthy`,
            response : `Ok`
        }
    }

    @Get()
    getAllUser(){
        const user = this.userService.findAll()
        return user;
    }

    @Post()
    async createUser(@Body() data : createUserDto){
        const user = await this.userService.create(data)
        return {
            message : `User created successfully !`,
            user
        }
    }

    @Get(':id')
    async getUserById(@Param('id') id : string){
        const user = await this.userService.findById(id);
        return user
    }

    @Patch(':id')
    async getUserByIdAndUpdate(@Param('id') id : string , @Body() data : updateUserDto){
        const user = await this.userService.update(id,data);
        return {
            message : `User updated successfully`,
            updatedata: data
        }
    }

    @Delete(':id')
    async removeUser(@Param('id' ) id : string){
        await this.userService.remove(id)
        return {
            message : `User deleted successfully !`
        }
    }

}
