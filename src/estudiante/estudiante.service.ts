import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante) private readonly estudianteRepository: Repository<Estudiante>,
  ) { }
  create(createEstudianteDto: CreateEstudianteDto) {
    return 'This action adds a new estudiante';
  }

  findAll() {
    return this.estudianteRepository.find();
  }

  findOne(mail: string) {
    return this.estudianteRepository.findOne({ where: { mail } });
  }

  getStudiantesSedeEstado(sede: any, estado: string) {
    console.log(sede)
    if (sede != 'valparaiso' && sede != 'santiago' && sede != 'sanFelipe') {
      throw new Error('Sede no válida');
    }
    return this.estudianteRepository.createQueryBuilder('estudiante')
      .innerJoin('estados', 'estados', 'estados.mailEstudiante = estudiante.mail')
      .where('estudiante.sede = :sede', { sede })
      .andWhere('estudiante.estado = :estado', { estado })
      .getMany();
    }

    update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
    }

    remove(id: number) {
    return `This action removes a #${id} estudiante`;
    }
  }
