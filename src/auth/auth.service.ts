import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { RegisterDto } from './dto/register.dto.js';
import bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService,
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService
    ){}

    async register(registerDto: RegisterDto){
        const {userName , email , password , age} = registerDto

        const existingUser = await this.userService.findByEmail(email);
        if(existingUser) throw new ConflictException(`User already exists !`);

        const hashedPassword = await bcrypt.hash(password,12);

        const registerData = {
            userName,
            email,
            password : hashedPassword,
            age
        }

        const user = await this.userService.create(registerData);
        return user
    }

    async login(loginDto : LoginDto){
        const { email,password} = loginDto
        const user = await this.userService.findByEmail(email);
        if(!user) throw new UnauthorizedException(`Invalid credentials !`);

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) throw new UnauthorizedException(`Invalid credentials !`);


        const tokens = this.generateToken(user.id , user.email)
        return tokens

    }
    
    async generateToken(id:string , email : string ){
        const payload = { sub : id , email}

        const accessToken = await this.jwtService.signAsync(payload)

        const refreshToken = await this.jwtService.signAsync(payload,{
            secret : this.configService.get<string>('REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN') as any,
        })

        return {accessToken , refreshToken}
    }


}
