import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { ClaseEstados } from 'src/app/entities/clase-estado';
import { Clase } from 'src/app/entities/clase';
import { RaitingGridComponent } from '../usuario-perfil-clases/raiting-grid/raiting-grid.component';
import { Calificaciones } from 'src/app/entities/calificaciones';

@Component({
  selector: 'app-usuario-calificaciones',
  templateUrl: './usuario-calificaciones.component.html',
  styleUrls: ['./usuario-calificaciones.component.scss']
})
export class UsuarioCalificacionesComponent implements OnInit {

  paramId: number;
  calificaciones: Calificaciones[] = [];
  settings: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected as: SeguridadService,
    protected ps: ProfesorService,
  ) { }

  ngOnInit(): void
  {
    this._setGrilla();
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData()
  {
      // get Calificaciones
      this.ps.getCalificaciones(this.paramId).subscribe(
        (value: any) => {
          value.data.forEach(c => {
            c.disabled = true;
          });
          this.calificaciones = value.data;
        }
      );
  }

  _setGrilla() {
    this.settings = {
      actions: false,
      attr: {
        class: 'datagrid',
      },
      columns: {
        alumno: {
          title: 'Alumno',
          filter: true,
          editable: false
        },
        calificacion: {
          title: 'Calificación',
          filter: false,
          editable: false,
          type: 'custom',
          renderComponent: RaitingGridComponent,
          valuePrepareFunction: (value, row, cell) => {
            return this.calificaciones;
          },
        },
        comentarios: {
          title: 'Comentario',
          filter: true,
          editable: false
        },
        materia: {
          title: 'Materia',
          filter: true,
          editable: false
        },
        fechaHora: {
          title: 'Fecha Clase',
          editable: false
        }
      }
    };
  }
}
