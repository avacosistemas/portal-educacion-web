import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SeguridadService } from '../../../services/seguridad.service';
import { ProfesorService } from '../../../services/profesor.service';
import { ToastrService } from 'ngx-toastr';
import { ClaseAlumnos } from '../../../entities/clase-alumnos';
import { RaitingGridComponent } from '../../usuario/usuario-perfil-clases/raiting-grid/raiting-grid.component';
import { Clase } from 'src/app/entities/clase';

@Component({
  selector: 'app-clase-alumnos',
  templateUrl: './clase-alumnos.component.html',
  styleUrls: ['./clase-alumnos.component.scss']
})
export class ClaseAlumnosComponent implements OnInit {
  @Output() goBack = new EventEmitter();
  @Input() clase: Clase;

  settings: any;
  claseAlumnos = new ClaseAlumnos();
  materiaHorario: '';
  materiaNombre: '';
  userId = 0;

  constructor(
    private seguridadService: SeguridadService,
    private profesorService: ProfesorService,
    private toastr: ToastrService,

  ) {
    this.userId = this.seguridadService.getUser().id;
  }

  ngOnInit(): void {
    this.setupGrilla();
    this.loadData();
  }

  setupGrilla() {
    this.settings = {
      columns: {
        alumno: { title: 'Alumno', filter: true, editable: false},
        comentarios: { title: 'Comentarios', filter: true, editable: false},
        calificacion: {
          title: 'Calificación',
          filter: false,
          editable: false,
          type: 'custom',
          renderComponent: RaitingGridComponent,
          valuePrepareFunction: (value, row, cell) => {
            return this.claseAlumnos.alumnos;
          },
        },
      },
      attr: {
        class: 'datagrid',
      },
      actions: false
    };

  }

  loadData()
  {
    this.profesorService.getClaseAlumnos(this.userId, this.clase.id ).subscribe(
      (value: any) => {
        if (value.status === 'OK')
        {
          this.claseAlumnos.alumnos = value.data;
          this.claseAlumnos.alumnos.map(a => a.disabled = true);
          if (value.data.lenght > 0) {
            this.claseAlumnos.fechaHora = value.data[0].fechaHora;
            this.claseAlumnos.materia = value.data[0].materia;
          }
        } else {
          this.toastr.error('Se produjo un error al buscar los alumnos');
        }
      },
      error => {
        this.toastr.error('Se produjo un error al buscar los alumnos');
      }

    );

  }
}
