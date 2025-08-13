import { Inject, Injectable } from '@nestjs/common';
import { CreateAsignacioneDto } from './dto/create-asignacione.dto';
import { UpdateAsignacioneDto } from './dto/update-asignacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Asignaciones } from './entities/asignacione.entity';

@Injectable()
export class AsignacionesService {

  constructor(
    @InjectRepository(Estudiante) private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Asignaciones) private readonly asignacioneRepository: Repository<Asignaciones>,
  ) {}

  create(createAsignacioneDto: CreateAsignacioneDto) {
    return 'This action adds a new asignacione';
  }

  findAll() {
    return this.asignacioneRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} asignacione`;
  }

  update(id: number, updateAsignacioneDto: UpdateAsignacioneDto) {
    return `This action updates a #${id} asignacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} asignacione`;
  }
}
