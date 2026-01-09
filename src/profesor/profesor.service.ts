import { Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {

  constructor(
    @InjectRepository(Profesor) private readonly profesorRepository: Repository<Profesor>,
  ) { }

  create(createProfesorDto: CreateProfesorDto) {
    return 'This action adds a new profesor';
  }

  findAll() {
    return `This action returns all profesor`;
  }

  async findOne(mail: string) {
    return await this.profesorRepository.findOne({ where: { mail } });
  }

  update(id: number, updateProfesorDto: UpdateProfesorDto) {
    return `This action updates a #${id} profesor`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesor`;
  }
}
