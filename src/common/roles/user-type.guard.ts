import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  mixin,
  Type,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { EstudianteService } from 'src/estudiante/estudiante.service';
import { JefaturaService } from 'src/jefatura/jefatura.service';
import { ProfesorService } from 'src/profesor/profesor.service';
import { SecretarioService } from 'src/secretario/secretario.service';

export function UserTypeGuard(userType: 'estudiante' | 'profesor' | 'secretario' | 'jefatura'): Type<CanActivate> {
  @Injectable()
  class RoleGuard implements CanActivate {
    constructor(private moduleRef: ModuleRef,
      private readonly estudianteService: EstudianteService,
      private readonly profesorService: ProfesorService,
      private readonly secretarioService: SecretarioService,
      private readonly jefaturaService: JefaturaService,

    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!user?.email) {
        throw new UnauthorizedException('No user info from JWT.');
      }

      switch (userType) {
        case 'estudiante':
          const student = await this.estudianteService.findOne(user.email);
          if (!student) {
            throw new UnauthorizedException('Student not found.');
          }

          break;
        case 'profesor':
          const profesor = await this.profesorService.findOne(user.email);
          if (!profesor) {
            throw new UnauthorizedException('Profesor not found.');
          }

          break;
        case 'secretario':
          const secretario = await this.secretarioService.findOne(user.email);
          if (!secretario) {
            throw new UnauthorizedException('Secretario not found.');
          }

          break;
        case 'jefatura':
          const jefatura = await this.jefaturaService.findOne(user.email);
          if (!jefatura) {
            throw new UnauthorizedException('Jefatura not found.');
          }

          break;
        default:
          throw new UnauthorizedException('Invalid user type.');
      }
      return true;
    }
  }

  return mixin(RoleGuard);
}
