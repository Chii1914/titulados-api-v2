import { Injectable, Scope } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { EstudianteService } from '../estudiante/estudiante.service';
import { JefaturaService } from '../jefatura/jefatura.service';
import { ProfesorService } from '../profesor/profesor.service';
import { SecretarioService } from '../secretario/secretario.service';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly estudianteService: EstudianteService,
        private readonly jefaturaService: JefaturaService,
        private readonly profesorService: ProfesorService,
        private readonly secretarioService: SecretarioService
    ) {
        // allow JWT-formatted tokens to be parsed
        // and RSA56 signed tokens to be accepted
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
            }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: process.env.AUTH0_AUDIENCE,
            issuer: `${process.env.AUTH0_ISSUER_URL}`,
            algorithms: ['RS256'],
        });
    }
    // auth0 will have authenticated the user and the payload will give us
    // information about the user which we can abtract such as the sub
    async validate(payload: any) {

        const userMail = payload['https://api.myapp.com/email'];

        const estudiante = await this.estudianteService.findOne(userMail);
        const jefatura = await this.jefaturaService.findOne(userMail);
        const docente = await this.profesorService.findOne(userMail);
        const secretario = await this.secretarioService.findOne(userMail);
        if (estudiante) {
            return { userId: payload.sub, email: userMail, sede: estudiante.sede }
        }
        if (jefatura) {
            return { userId: payload.sub, email: userMail, sede: jefatura.sede }
        }
        if (docente) {
            return { userId: payload.sub, email: userMail, sede: docente.sede }
        }
        if (secretario) {
            return { userId: payload.sub, email: userMail, sede: secretario.sede }
        }

        return {
            userId: payload.sub,
            email: payload['https://api.myapp.com/email'], // Make sure this matches the custom claim from Auth0
            sede: null
        };
    }

}