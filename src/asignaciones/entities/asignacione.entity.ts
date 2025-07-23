import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiante } from "../../estudiante/entities/estudiante.entity";
import { Profesor } from "../../profesor/entities/profesor.entity";

@Index("mailEstudiante", ["mailEstudiante", "mailProfesor", "rol"], {
  unique: true,
})
@Index("mailProfesor", ["mailProfesor"], {})
@Entity("asignaciones", { schema: "tituladosv2" })
export class Asignaciones {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "mailEstudiante", length: 255 })
  mailEstudiante: string;

  @Column("varchar", { name: "mailProfesor", length: 255 })
  mailProfesor: string;

  @Column("enum", {
    name: "rol",
    enum: ["informante", "guia", "presidente", "secretario"],
  })
  rol: "informante" | "guia" | "presidente" | "secretario";

  @Column("date", { name: "fechaAsignacion", nullable: true })
  fechaAsignacion: string | null;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.asignaciones, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "mailEstudiante", referencedColumnName: "mail" }])
  mailEstudiante2: Estudiante;

  @ManyToOne(() => Profesor, (profesor) => profesor.asignaciones, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "mailProfesor", referencedColumnName: "mail" }])
  mailProfesor2: Profesor;
}
