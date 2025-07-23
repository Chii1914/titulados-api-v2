import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiante } from "../../estudiante/entities/estudiante.entity";

@Index("mailEstudiante", ["mailEstudiante"], { unique: true })
@Entity("notas", { schema: "tituladosv2" })
export class Notas {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "mailEstudiante", unique: true, length: 255 })
  mailEstudiante: string;

  @Column("decimal", {
    name: "notaGuia",
    nullable: true,
    precision: 4,
    scale: 2,
  })
  notaGuia: string | null;

  @Column("decimal", {
    name: "notaInformante",
    nullable: true,
    precision: 4,
    scale: 2,
  })
  notaInformante: string | null;

  @Column("decimal", {
    name: "notaExamenOral",
    nullable: true,
    precision: 4,
    scale: 2,
  })
  notaExamenOral: string | null;

  @Column("decimal", {
    name: "notaTesis",
    nullable: true,
    precision: 4,
    scale: 2,
  })
  notaTesis: string | null;

  @Column("decimal", {
    name: "notaFinal",
    nullable: true,
    precision: 4,
    scale: 2,
  })
  notaFinal: string | null;

  @OneToOne(() => Estudiante, (estudiante) => estudiante.notas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "mailEstudiante", referencedColumnName: "mail" }])
  mailEstudiante2: Estudiante;
}
