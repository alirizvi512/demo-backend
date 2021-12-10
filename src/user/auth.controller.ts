import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: UserService) {

    }
    @Get()
    public async login(@Body() loginDto: LoginDto) {
        const responseObj = await this.userService.login(loginDto);
        return {
            status: HttpStatus.OK,
            ...responseObj
        };
    }

    @Post()
    public async register(@Body() createUserDto: CreateUserDto) {
        const userObj = await this.userService.register(createUserDto);
        return {
            status: HttpStatus.OK,
            data: userObj,
            message: 'Success'
        };
    }
}