import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from 'src/files/files.service';
import { User } from 'src/decorators/getUser.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UserTypeGuard } from 'src/common/roles/user-type.guard';
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService){}
  @Get()
  getAll() {
    return this.estudianteService.findAll();
  }
 
}
