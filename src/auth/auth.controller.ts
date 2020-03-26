import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/authCredential.dto';
import { AuthService } from './auth.service';
import { JwtResponse } from './dto/jwtResponse.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<JwtResponse> {
        return this.authService.signIn(authCredentialDto);
    }
}
