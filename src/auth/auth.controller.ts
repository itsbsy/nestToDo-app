import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto ) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: LoginDto) {
        return this.authService.signin(dto);
    }

}
