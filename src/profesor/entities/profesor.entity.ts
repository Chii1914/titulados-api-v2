import { Column, Entity, OneToMany } from "typeorm";
import { Asignaciones } from "../../asignaciones/entities/asignacione.entity";

@Entity("profesor", { schema: "tituladosv2" })
export class Profesor {
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

  @OneToMany(() => Asignaciones, (asignaciones) => asignaciones.mailProfesor2)
  asignaciones: Asignaciones[];
}
