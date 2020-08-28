export class Calificaciones {
    id: number;
    calificacion: number;
    alumno: string;
    comentarios: string;
    materiaId?: number;
    materia: string;
    fechaHora: string;
    disabled: boolean; // Deshabilita calificacion en frontend
}