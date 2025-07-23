import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Estudiante } from "../../estudiante/entities/estudiante.entity";

@Entity("estados", { schema: "tituladosv2" })
export class Estados {
  @Column("varchar", { primary: true, name: "mailEstudiante", length: 255 })
  mailEstudiante: string;

  @Column("varchar", { name: "estado", length: 100 })
  estado: string;

  @Column("date", { name: "fechaProcesado", nullable: true })
  fechaProcesado: string | null;

  @Column("text", { name: "comentarios", nullable: true })
  comentarios: string | null;

  @OneToOne(() => Estudiante, (estudiante) => estudiante.estados, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "mailEstudiante", referencedColumnName: "mail" }])
  mailEstudiante2: Estudiante;
}
