import { Global, Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/Profesor.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor]), JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '300m' },
    }),],
  controllers: [ProfesorController],
  providers: [ProfesorService],
  exports: [ProfesorService, TypeOrmModule.forFeature([Profesor])], 
})
export class ProfesorModule {}
