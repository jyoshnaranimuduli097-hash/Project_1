import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('register')
    async registerUser(@Body() registerDto : RegisterDto){
        const user = await this.authService.register(registerDto)
        return {
            message : `User:${user.id},created successfully !`,
            user
        }
    }

    @Post('login')
    async loginUser(@Req() req :Express.Request ,@Body() loginDto : LoginDto){
        const token = this.authService.login(loginDto)

        
    }
}
