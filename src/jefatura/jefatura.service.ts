import { Injectable } from '@nestjs/common';
import { CreateJefaturaDto } from './dto/create-jefatura.dto';
import { UpdateJefaturaDto } from './dto/update-jefatura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Jefatura } from './entities/jefatura.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JefaturaService {
  constructor(
    @InjectRepository(Jefatura) private readonly jefaturaRepository: Repository<Jefatura>,
  ) { }
  create(createJefaturaDto: CreateJefaturaDto) {
    return 'This action adds a new jefatura';
  }

  findAll() {
    return `This action returns all jefatura`;
  }

  async findOne(mail: string) {
    return await this.jefaturaRepository.findOne({ where: { mail } });
  }

  update(id: number, updateJefaturaDto: UpdateJefaturaDto) {
    return `This action updates a #${id} jefatura`;
  }

  remove(id: number) {
    return `This action removes a #${id} jefatura`;
  }
}
