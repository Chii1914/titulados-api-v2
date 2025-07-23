import { Global, Module } from '@nestjs/common';
import { JefaturaService } from './jefatura.service';
import { JefaturaController } from './jefatura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jefatura } from './entities/jefatura.entity';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Jefatura]), JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '300m' },
    }),],
  controllers: [JefaturaController],
  providers: [JefaturaService],
  exports: [JefaturaService, TypeOrmModule.forFeature([Jefatura])],
})
export class JefaturaModule {}
