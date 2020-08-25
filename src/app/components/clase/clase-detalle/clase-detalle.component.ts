import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { SeguridadService } from "../../../services/seguridad.service";
import { ActivatedRoute } from "@angular/router";
import { AlumnoService } from "../../../services/alumno.service";
import { ProfesorService } from "../../../services/profesor.service";
import { Clase } from "../../../entities/clase";

@Component({
  selector: 'app-clase-detalle',
  templateUrl: './clase-detalle.component.html',
  styleUrls: ['./clase-detalle.component.scss']
})
export class ClaseDetalleComponent implements OnInit {

  isAlumno = false;
  userId = 0;
  paramId: number
  clase: Clase;

  constructor(
    private route: ActivatedRoute,
    protected as: SeguridadService,
    protected als: AlumnoService,
    protected ps: ProfesorService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.isAlumno = this.as.isAlumno();
    this.userId = this.as.getUser().id;
    this.loadData();
  }

  loadData() {
    this._mock();
    return;

    if (this.isAlumno) {
      this.als.getClase(this.userId, this.paramId).subscribe(
        (value: any) => {
          this.clase = {
            profesorId: value.data.profesorId,
            profesor: value.data.profesorNombre,
            estado: value.data.estado,
            calificacion: value.data.calificacion,
            hora: value.data.hora,
            dia: value.data.dia,
            materia: value.data.materiaNombre,
            institucion: value.data.nombreInstitucion,
            id: value.data.id,
            institucionId: value.data.idInstitucion,
            materiaId: value.data.materiaId
          }
        }
      );
    } else {
      this.ps.getClase(this.userId, this.paramId).subscribe(
        (value: any) => {
          this.clase = {
            profesorId: value.data.profesorId,
            profesor: value.data.profesorNombre,
            estado: value.data.estado,
            calificacion: value.data.calificacion,
            hora: value.data.hora,
            dia: value.data.dia,
            materia: value.data.materiaNombre,
            institucion: value.data.nombreInstitucion,
            id: value.data.id,
            institucionId: value.data.idInstitucion,
            materiaId: value.data.materiaId
          }
        }
      );

    }
  }

  _mock() {
    this.clase = {
      profesorId: 1,
      profesor: 'Claudio Kereques',
      estado: 'Pendiente',
      calificacion: 3.5,
      hora: '11:45',
      dia: '20/08/2020',
      materia: 'Matemáticas',
      institucion: 'Teach',
      id: 1,
      institucionId: 1,
      materiaId: 1
    };
  }


  goBack() {
    this.location.back();
  }

}
