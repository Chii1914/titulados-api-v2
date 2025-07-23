import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators/getUser.decorator';
import { EstudianteService } from 'src/estudiante/estudiante.service';
import { JefaturaService } from 'src/jefatura/jefatura.service';
import { ProfesorService } from 'src/profesor/profesor.service';
import { SecretarioService } from 'src/secretario/secretario.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly estudianteService: EstudianteService,
        private readonly profesorService: ProfesorService,
        private readonly secretarioService: SecretarioService,
        private readonly jefaturaService: JefaturaService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('validate')
    async validateUser(@User() user, @Res() res) {
        const estudiante = await this.estudianteService.findOne(user.email);
        const profesor = await this.profesorService.findOne(user.email);
        const secretario = await this.secretarioService.findOne(user.email);
        const jefatura = await this.jefaturaService.findOne(user.email);

        if (!estudiante && !profesor && !secretario && !jefatura) {
            return res.status(404).json({ message: 'Inexistente' });
        }

        if (estudiante) {
            return res.status(200).json({ message: 'Student authenticated', user: 'estudiante' });
        }
        if (profesor) {
            return res.status(200).json({ message: 'Professor authenticated', user: 'profesor' });
        }
        if (secretario) {
            return res.status(200).json({ message: 'Secretary authenticated', user: 'secretario' });
        }
        if (jefatura) {
            return res.status(200).json({ message: 'Jefatura authenticated', user: 'jefatura' });
        }
        return res.status(403).json({ message: 'Unauthorized' });
    }
    @Get('test')
    async test() {
        return { message: 'Test successful' };
    } 
}
