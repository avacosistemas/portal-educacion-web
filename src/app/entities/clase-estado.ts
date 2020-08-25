export class ClaseEstado
{
  value: string;
}

export class ClaseEstados {
  estados: ClaseEstado[];

  constructor() {
    this.estados = [
      { value: "En Curso" },
      { value: "Pendiente" },
      { value: "Finalizado" }
    ];
  }
}
