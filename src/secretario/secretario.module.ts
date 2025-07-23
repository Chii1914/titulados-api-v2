import { Global, Module } from '@nestjs/common';
import { SecretarioService } from './secretario.service';
import { SecretarioController } from './secretario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Secretario } from './entities/secretario.entity';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Secretario]), JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '300m' },
    }),],
  controllers: [SecretarioController],
  providers: [SecretarioService],
  exports: [SecretarioService, TypeOrmModule.forFeature([Secretario])],
})
export class SecretarioModule {}
