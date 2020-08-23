export class Alumno {
  id: number;
  nombre: string;
  apellido: string;
  nombreApellido?: string;
  username: string;
  tipoIdentificacion: string;
  numeroIdentificacion: number;
  nombreInstitucion: string;
  password?: string;
  email: string;
  telefonoMovil: string;
  telefonoFijo?: string;
  foto?: string;
  institucion: string;

  constructor() {
    this.tipoIdentificacion = 'DNI';
  }

}
