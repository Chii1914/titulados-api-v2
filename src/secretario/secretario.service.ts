import { Injectable } from '@nestjs/common';
import { CreateSecretarioDto } from './dto/create-secretario.dto';
import { UpdateSecretarioDto } from './dto/update-secretario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Secretario } from './entities/secretario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SecretarioService {
  constructor(
    @InjectRepository(Secretario) private readonly secretarioRepository: Repository<Secretario>,
  ) { }
  create(createSecretarioDto: CreateSecretarioDto) {
    return 'This action adds a new secretario';
  }

  findAll() {
    return `This action returns all secretario`;
  }

  async findOne(mail: string) {
    return await this.secretarioRepository.findOne({ where: { mail } });
  }

  update(id: number, updateSecretarioDto: UpdateSecretarioDto) {
    return `This action updates a #${id} secretario`;
  }

  remove(id: number) {
    return `This action removes a #${id} secretario`;
  }
}
