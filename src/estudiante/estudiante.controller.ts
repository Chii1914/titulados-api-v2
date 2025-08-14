import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from 'src/files/files.service';
import { User } from 'src/decorators/getUser.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UserTypeGuard } from 'src/common/roles/user-type.guard';
import { Sede } from 'src/decorators/sede.decorator';
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService){}
  @Get()
  getAll() {
    return this.estudianteService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('sede-estado')
  async getEstudiantesSedeEstado(@Body () body: { sede: string }, @Sede() sede: string) {
    return await this.estudianteService.getStudiantesSedeEstado(body.sede, sede);
  } 
}
