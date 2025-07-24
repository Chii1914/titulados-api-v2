import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { AsignacionesModule } from './asignaciones/asignaciones.module';
import { EstadosModule } from './estados/estados.module';
import { NotasModule } from './notas/notas.module';
import { JefaturaModule } from './jefatura/jefatura.module';
import { SecretarioModule } from './secretario/secretario.module';
import { Estudiante } from './estudiante/entities/estudiante.entity';
import { Asignaciones } from './asignaciones/entities/asignacione.entity';
import { Notas } from './notas/entities/nota.entity';
import { Profesor } from './profesor/entities/profesor.entity';
import { Estados } from './estados/entities/estado.entity';
import { Jefatura } from './jefatura/entities/jefatura.entity';
import { Secretario } from './secretario/entities/secretario.entity';
import { UserController } from './user/user.controller';
import { Auth0Module } from './auth0/auth0.module';
import { FilesService } from './files/files.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: parseInt(configService.get<string>('DB_PORT')) || 3306,
        username: configService.get<string>('DB_USERNAME') || 'root',
        password: configService.get<string>('DB_PASSWORD') || '',
        database: configService.get<string>('DB_NAME') || '',
        entities: [Estudiante, Asignaciones, Notas, Profesor, Estados, Secretario, Jefatura],
        synchronize: configService.get<string>('TYPEORM_SYNC') === 'true',
        driver: require('mysql2'),

      }),
      inject: [ConfigService],
    }),
    EstudianteModule,
    ProfesorModule,
    AsignacionesModule,
    EstadosModule,
    NotasModule,
    JefaturaModule,
    SecretarioModule,
    Auth0Module
  ],
  controllers: [UserController],
  providers: [FilesService],
})
export class AppModule { }
