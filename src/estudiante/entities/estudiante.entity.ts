import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { Asignaciones } from "../../asignaciones/entities/asignacione.entity";
import { Estados } from "../../estados/entities/estado.entity";
import { Notas } from "../../notas/entities/nota.entity";

@Index("codigo", ["codigo"], { unique: true })
@Index("rut", ["rut"], { unique: true })
@Entity("estudiante", { schema: "tituladosv2" })
export class Estudiante {
  @Column("varchar", { primary: true, name: "mail", length: 255 })
  mail: string;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "segundoNombre", nullable: true, length: 100 })
  segundoNombre: string | null;

  @Column("varchar", { name: "apellido", length: 100 })
  apellido: string;

  @Column("varchar", { name: "segundoApellido", nullable: true, length: 100 })
  segundoApellido: string | null;

  @Column("varchar", { name: "rut", unique: true, length: 20 })
  rut: string;

  @Column("varchar", { name: "codigo", unique: true, length: 50 })
  codigo: string;

  @Column("int", { name: "agnoIngreso", nullable: true })
  agnoIngreso: number | null;

  @Column("int", { name: "agnoEgreso", nullable: true })
  agnoEgreso: number | null;

  @Column("varchar", { name: "nroResolucion", nullable: true, length: 100 })
  nroResolucion: string | null;

  @Column("time", { name: "hora", nullable: true })
  hora: string | null;

  @Column("date", { name: "fechaExamen", nullable: true })
  fechaExamen: string | null;

  @OneToMany(() => Asignaciones, (asignaciones) => asignaciones.mailEstudiante2)
  asignaciones: Asignaciones[];

  @OneToOne(() => Estados, (estados) => estados.mailEstudiante2)
  estados: Estados;

  @OneToOne(() => Notas, (notas) => notas.mailEstudiante2)
  notas: Notas;
}
