import { BadRequestException, Body, Controller, Get, ImATeapotException, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UserTypeGuard } from 'src/common/roles/user-type.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Get('alumno/:mail')
  async getFiles(@Param('mail') mail: string) {
    if (!mail) {
      throw new BadRequestException('Correo (mail) no fue provisto', {
        cause: new Error(),
        description: 'Error',
      });
    }
    return await this.filesService.getFiles(mail);
  }

  //@UseGuards(AuthGuard('jwt'), UserTypeGuard('profesor'))
  @Post('upload/ficha')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileFicha(@UploadedFile() file: Express.Multer.File, @Body('mail') mail: string) {
    if (!file || !mail) {
      throw new BadRequestException('Archivo (file) y correo (mail) no fueron provistos', {
        cause: new Error(),
        description: 'Error',
      });
    }
    return await this.filesService.saveFicha(file, mail);
  }

  @Post('upload/guia')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileGuia(@UploadedFile() file: Express.Multer.File, @Body('mail') mail: string) {
    if (!file || !mail) {
      throw new BadRequestException('Archivo (file) y correo (mail) no fueron provistos', {
        cause: new Error(),
        description: 'Error',
      });
    }
    return await this.filesService.saveGuia(file, mail);
  }

  @Post('upload/informante')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileInformante(@UploadedFile() file: Express.Multer.File,@Body('mail') mail: string) {
     if (!file || !mail) {
      throw new BadRequestException('Archivo (file) y correo (mail) no fueron provistos', {
        cause: new Error(),
        description: 'Error',
      });
    }
    return await this.filesService.saveInformante(file, mail);
  }

  @Post('upload/tesis')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileTesis(@UploadedFile() file: Express.Multer.File, @Body('mail') mail: string) {
    if (!file || !mail) {
      throw new BadRequestException('Archivo (file) y correo (mail) no fueron provistos', {
        cause: new Error(),
        description: 'Error',
      });
    }
    return await this.filesService.saveTesis(file, mail);
  }

  @Post('upload/alumnos')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAlumnos(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.saveAlumnos(file);
  }

  @Post('generar/reporte')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileReporte(@UploadedFile() file: Express.Multer.File, mail: string) {
    this.filesService.saveReporte(file, mail);
  }

}

