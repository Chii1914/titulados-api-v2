import { Injectable } from '@nestjs/common';
import { CreateJefaturaDto } from './dto/create-jefatura.dto';
import { UpdateJefaturaDto } from './dto/update-jefatura.dto';

@Injectable()
export class JefaturaService {
  create(createJefaturaDto: CreateJefaturaDto) {
    return 'This action adds a new jefatura';
  }

  findAll() {
    return `This action returns all jefatura`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jefatura`;
  }

  update(id: number, updateJefaturaDto: UpdateJefaturaDto) {
    return `This action updates a #${id} jefatura`;
  }

  remove(id: number) {
    return `This action removes a #${id} jefatura`;
  }
}
