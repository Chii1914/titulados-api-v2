import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Estados } from 'src/estados/entities/estado.entity';

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

  async getStudiantesSedeEstado(estado: string, sede: string) {
    if (sede === 'all') {
      return await this.estudianteRepository.createQueryBuilder('estudiante')
        .innerJoin(Estados, 'estados', 'estudiante.mail = estados.mailEstudiante')
        .andWhere('estados.estado = :estado', { estado })
        .getMany();
    }
    return await this.estudianteRepository.createQueryBuilder('estudiante')
      .innerJoin(Estados, 'estados', 'estudiante.mail = estados.mailEstudiante')
      .andWhere('estados.estado = :estado', { estado })
      .andWhere('estudiante.sede = :sede', { sede })
      .getMany()
  }

  async getStudiantesSede(sede: string) {
    return await this.estudianteRepository.createQueryBuilder('estudiante')
      .where('estudiante.sede = :sede', { sede })
      .getMany();
  }
  
  async getStudianteEstado(estado: string, mail: string) {
    return await this.estudianteRepository.createQueryBuilder('estudiante')
      .innerJoin(Estados, 'estados', 'estudiante.mail = estados.mailEstudiante')
      .andWhere('estados.estado = :estado', { estado })
      .getMany();
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
