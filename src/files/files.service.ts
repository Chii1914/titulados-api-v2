import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Repository } from 'typeorm';
import * as xlsx from 'xlsx';

@Injectable()
export class FilesService {

    constructor(
        @InjectRepository(Estudiante) private readonly estudianteRepository: Repository<Estudiante>,
    ) { }

    private readonly uploadPath = path.join(process.cwd(), 'public', 'uploads');

    async getFiles(mail: string) {
        try {
            const studentPath = path.join(this.uploadPath, mail);
            if (!fs.existsSync(studentPath)) {
                return { message: 'El estudiante no tiene directorio' };
            }
            const documentPath = path.join(studentPath);
            const documentos = fs.existsSync(documentPath) ? fs.readdirSync(documentPath) : [];
            return { documentos };
        } catch (e) {
            console.error(e);
            return { message: 'Error al obtener nombres de archivos' };
        }
    }

    async saveFicha(file: Express.Multer.File, mail: string): Promise<string> {
        try {
            if (!fs.existsSync(this.uploadPath)) {
                fs.mkdirSync(this.uploadPath);
            }
            const studentPath = path.join(this.uploadPath, mail);
            if (!fs.existsSync(studentPath)) {
                fs.mkdirSync(studentPath);
            }
            const documentPath = path.join(studentPath, 'ficha');
            if (!fs.existsSync(documentPath)) {
                fs.mkdirSync(documentPath);
            }
            const ext = path.extname(file.originalname);
            const filePath = path.join(documentPath, `ficha${ext}`);
            fs.writeFileSync(filePath, file.buffer);
            return 'Documentos subidos correctamente';
        }
        catch (err) {
            console.error(err);
            return 'Error al subir documentos';
        }
    }


    async saveGuia(file: Express.Multer.File, mail: string): Promise<string> {
        try {
            if (!fs.existsSync(this.uploadPath)) {
                fs.mkdirSync(this.uploadPath);
            }
            const studentPath = path.join(this.uploadPath, mail);
            if (!fs.existsSync(studentPath)) {
                fs.mkdirSync(studentPath);
            }
            const documentPath = path.join(studentPath, 'guia');
            if (!fs.existsSync(documentPath)) {
                fs.mkdirSync(documentPath);
            }
            const ext = path.extname(file.originalname);
            const filePath = path.join(documentPath, `guia${ext}`);
            fs.writeFileSync(filePath, file.buffer);
            return 'Rúbrica guía subida correctamente';
        }
        catch (err) {
            console.error(err);
            return 'Error al subir rúbrica guía';
        }
    }
    async saveInformante(file: Express.Multer.File, mail: string): Promise<string> {
        try {
            if (!fs.existsSync(this.uploadPath)) {
                fs.mkdirSync(this.uploadPath);
            }
            const studentPath = path.join(this.uploadPath, mail);
            if (!fs.existsSync(studentPath)) {
                fs.mkdirSync(studentPath);
            }
            const documentPath = path.join(studentPath, 'informante');
            if (!fs.existsSync(documentPath)) {
                fs.mkdirSync(documentPath);
            }
            const ext = path.extname(file.originalname);
            const filePath = path.join(documentPath, `informante${ext}`);
            fs.writeFileSync(filePath, file.buffer);
            return 'Rúbrica informante subida correctamente';
        }
        catch (err) {
            console.error(err);
            return 'Error al subir rúbrica informante';
        }
    }

    async saveTesis(file: Express.Multer.File, mail: string): Promise<string> {
        try {
            if (!fs.existsSync(this.uploadPath)) {
                fs.mkdirSync(this.uploadPath);
            }
            const studentPath = path.join(this.uploadPath, mail);
            if (!fs.existsSync(studentPath)) {
                fs.mkdirSync(studentPath);
            }
            const documentPath = path.join(studentPath, 'tesis');
            if (!fs.existsSync(documentPath)) {
                fs.mkdirSync(documentPath);
            }
            const ext = path.extname(file.originalname);
            const filePath = path.join(documentPath, `tesis${ext}`);
            fs.writeFileSync(filePath, file.buffer);
            return 'Tesis subida correctamente';
        }
        catch (err) {
            console.error(err);
            return 'Error al subir tesis';
        }
    }

    async saveAlumnos(file: Express.Multer.File): Promise<{ added: string[]; skipped: string[], badFormat }> {
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        interface StudentExcelRow {
            rut: string;
            codigo: string;
            mail: string;
            nombre: string;
            apellido: string;
            agnoIngreso: number;
            [key: string]: any;
        }
        const studentsData = xlsx.utils.sheet_to_json<StudentExcelRow>(worksheet);
        const addedStudents: string[] = [];
        const skippedStudents: string[] = [];
        const badFormatStudents: string[] = [];
        const studentsToSave: Estudiante[] = [];
        for (const student of studentsData) {
            const nombre = student['Nombre'];
            const segundoNombre = student['Segundo Nombre'];
            const apellido = student['Apellido Paterno'];
            const segundoApellido = student['Apellido Materno'];
            const rut = student['Rut'];
            const codigo = student['Código carrera'];
            const agnoIngreso = student['Año ingreso'];
            const mail = student['Correo'];
            const existingStudent = await this.estudianteRepository.findOne({
                where: { rut: rut, mail: mail },
            });
            if (existingStudent) {
                skippedStudents.push(`${existingStudent.nombre} ${existingStudent.apellido} (${existingStudent.rut})`);
            } else {
                if (
                    !nombre ||
                    !apellido ||
                    !rut ||
                    !codigo ||
                    !mail ||
                    !agnoIngreso ||
                    !Number.isInteger(Number(agnoIngreso))
                ) {
                    badFormatStudents.push(`${nombre} ${apellido} (${rut})`);
                    continue;
                }
                const newStudent = this.estudianteRepository.create({
                    nombre: nombre,
                    segundoNombre: segundoNombre,
                    apellido: apellido,
                    segundoApellido: segundoApellido,
                    rut: rut,
                    codigo: codigo,
                    mail: mail,
                    agnoIngreso: agnoIngreso,
                });
                studentsToSave.push(newStudent);
                addedStudents.push(`${newStudent.nombre} ${newStudent.apellido} (${newStudent.rut})`);
            }
        }
        if (studentsToSave.length > 0) {
            await this.estudianteRepository.save(studentsToSave);
        }

        return {
            added: addedStudents,
            skipped: skippedStudents,
            badFormat: badFormatStudents
        };
    }


    uploadDocument(student: string, files: Array<Express.Multer.File>) { }
    saveReporte(file: Express.Multer.File, mail: string): string {
        // Implement logic to save the file and return the file path or URL
        console.log('Saving Reporte:', file);
        return `Reporte saved: ${file.originalname}`;
    }
}
