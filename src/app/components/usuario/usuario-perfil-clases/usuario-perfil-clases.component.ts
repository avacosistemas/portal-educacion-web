import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SeguridadService } from "../../../services/seguridad.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Clase } from "../../../entities/clase";
import { AlumnoService } from "../../../services/alumno.service";
import { ProfesorService } from "../../../services/profesor.service";
import { ClaseEstados } from "../../../entities/clase-estado";
import { RaitingGridComponent } from './raiting-grid/raiting-grid.component';
declare var $;

@Component({
  selector: 'app-usuario-perfil-clases',
  templateUrl: './usuario-perfil-clases.component.html',
  styleUrls: ['./usuario-perfil-clases.component.scss']
})
export class UsuarioPerfilClasesComponent implements OnInit {

  @Output() detalleClase = new EventEmitter();
  paramId: number;
  clases: Clase[] = [];
  isAlumno = false;
  estados = new ClaseEstados();
  settings: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected as: SeguridadService,
    protected als: AlumnoService,
    protected ps: ProfesorService,
  ) { }

  ngOnInit(): void
  {
    this.setupGrilla();
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.isAlumno = this.as.isAlumno();
    this.loadData();
  }

  loadData()
  {
    if (this.isAlumno)
    {
      // get Alumno
      this.als.getClases(this.paramId).subscribe(
        (value: any) => {
          this.clases = [];
          value.data.forEach( i =>
            {
              this.clases.push({
                id: i.id,
                calificacion: i.calificacion,
                institucion: i.institucion,
                materia: i.materia,
                dia: i.dia,
                hora: i.hora,
                estado: i.estado,
                profesor: i.profesor,
              });
            }
          );
        }
      );

    } else {
      // get profesor
      this.ps.getClases(this.paramId).subscribe(
        (value: any) => {
          this.clases = [];
          value.data.forEach( i =>
            {
              this.clases.push({
                id: i.id,
                calificacion: i.calificacion,
                institucion: i.institucion,
                materia: i.materia,
                dia: i.dia,
                hora: i.hora,
                estado: i.estado,
                estadoHtml: `<div class="btn ${this.returnClassEstado(i.estado)}"><i class="fas fa"></i></div>`,
              });
            }
          );
        }
      );
    }
  }

  returnClassEstado(estado: string) {
    switch (estado) {
      case 'Pendiente':
        return 'btn-danger pendiente';
      case 'Finalizado':
        return 'btn-success finalizado';
      case 'En Curso':
        return 'btn-warning encurso';
      default:
        break;
    }
  }

  setupGrilla() {
    this.settings = {
      noDataMessage: 'No hay registros',
      actions: {
        custom: [
          {
            name: 'detail',
            title: '<a class="btn btn-primary primary-button detalle" href="#"><i class="fas fa-eye"></i></a>',
          },
          {
            name: 'ingresar',
            title: '<a class="btn btn-primary ingresar" href="#"><i class="fas fa-arrow-circle-right"></i></a>',
          }
        ],
        add: false,
        edit: false,
        delete: false,
        columnTitle: '',
        position: 'right'
      },
      rowClassFunction: (row) => {
        if (row.data.estado !== 'En Curso'){
            return 'hide-action';
        } else {
            return '';
        }
      },
      attr: {
        class: 'datagrid',
      },
      columns: {
        institucion: {
          title: 'Institución',
          filter: true,
          editable: false
        },
        profesion: {
          title: 'Profesión',
          filter: true,
          editable: false
        },
        materia: {
          title: 'Materia',
          filter: true,
          editable: false
        },
        dia: {
          title: 'Día',
          editable: false,
          width: '10%'
        },
        hora: {
          title: 'Hora',
          filter: true,
          editable: false,
          width: '7%'
        },
        calificacion: {
          title: 'Calificación',
          filter: false,
          editable: false,
          type: 'custom',
          renderComponent: RaitingGridComponent,
          valuePrepareFunction: (value, row, cell) => {
            return this.clases;
          },
        },
        estadoHtml: {
          title: 'Estado',
          type: 'html',
          filter: {
            type: 'list',
              config: {
                selectText: '',
                  list: [
                    { value: 'Pendiente', title: 'Pendiente' },
                    { value: 'En Curso', title: 'En Curso' },
                    { value: 'Finalizado', title: 'Finalizado' },
                  ]
                }
              },
          editable: false
        },
        accion: {
          editable: false,
          type: 'html',
          filter: false
        }
      }
    };
  }

  onCustomAction(event) {
    switch ( event.action) {
      case 'detail':
        // this.router.navigate([`/clase/detalle/${event.data.id}`]);
        this.detalleClase.emit(event.data.id);
        break;
    }
  }

}
