import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from 'src/dtos/auth/login-auth.dto';
import { RegisterAuthDto } from 'src/dtos/auth/register-auth.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Ruta para iniciar sesión
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const user = await this.authService.validateUser(
      loginAuthDto.email,
      loginAuthDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return this.authService.login(user);
  }

  // Ruta para registrar un nuevo usuario
  @Post('register')
  async register(
    @Body()
    registerAuthDto: RegisterAuthDto,
  ) {
    return this.authService.register({
      email: registerAuthDto.email,
      name: registerAuthDto.name,
      password: registerAuthDto.password,
      role: registerAuthDto.role,
      refreshToken: registerAuthDto.refreshToken,
    });
  }
}
