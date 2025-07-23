import { Column, Entity } from "typeorm";

@Entity("jefatura", { schema: "tituladosv2" })
export class Jefatura {
  @Column("varchar", { primary: true, name: "mail", length: 255 })
  mail: string;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "apellido", length: 100 })
  apellido: string;

  @Column("varchar", { name: "sede", nullable: true, length: 100 })
  sede: string | null;
}
