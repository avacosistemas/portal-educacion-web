import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SeguridadService } from '../../../services/seguridad.service';
import { ActivatedRoute } from '@angular/router';
import { ProfesorService } from '../../../services/profesor.service';
import { ToastrService } from 'ngx-toastr';
import { ClaseAlumnos } from '../../../entities/clase-alumnos';
import { RaitingGridComponent } from '../../usuario/usuario-perfil-clases/raiting-grid/raiting-grid.component';

@Component({
  selector: 'app-clase-alumnos',
  templateUrl: './clase-alumnos.component.html',
  styleUrls: ['./clase-alumnos.component.scss']
})
export class ClaseAlumnosComponent implements OnInit {
  @Output() goBack = new EventEmitter();
  @Input() idClase: number;

  settings: any;
  paramId: number;
  clase = new ClaseAlumnos();
  materiaHorario: '';
  materiaNombre: '';
  userId = 0;

  constructor(
    private seguridadService: SeguridadService,
    private profesorService: ProfesorService,
    private toastr: ToastrService,
    private route: ActivatedRoute,

  ) {
    this.userId = this.seguridadService.getUser().id;
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if ( param ) {
      this.paramId =  Number( param );
    } else {
      this.paramId = 0;
    }

    // el id de la clase puede venir por input
    this.idClase = this.paramId;
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
            return this.clase.alumnos;
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
    this.profesorService.getClaseAlumnos(this.userId, this.idClase ).subscribe(
      (value: any) => {
        if (value.status === 'OK')
        {
          this.clase.alumnos = value.data;
          if (value.data.lenght > 0) {
            this.clase.fechaHora = value.data[0].fechaHora;
            this.clase.materia = value.data[0].materia;
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
