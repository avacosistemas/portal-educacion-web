export class Materia {
  id: number;
  nombre: string;
  descripcion?: string;
  idNivel?: number;
  nivelNombre?: number;

  constructor() {
    this.id = 0;
    this.idNivel = 0;
    this.nombre = '';
    this.descripcion = '';
  }

}
