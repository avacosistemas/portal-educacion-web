export class ClaseAlumnos {
  alumnos: ClaseAlumno[] = [];
  materia?: string;
  fechaHora?: string;
  idString: string;
}

export class ClaseAlumno {
  alumno?: string;
  calificacion?: number;
  comentarios?: string;
  materia?: string;
  fechaHora?: string;
  idString: string;
  disabled: boolean; // Deshabilita las estrellas
}


