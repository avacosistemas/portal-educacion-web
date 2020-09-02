import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SeguridadService } from "../../../services/seguridad.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Clase } from "../../../entities/clase";
import { AlumnoService } from "../../../services/alumno.service";
import { ProfesorService } from "../../../services/profesor.service";
import { ClaseEstados } from "../../../entities/clase-estado";
import { RaitingGridComponent } from './raiting-grid/raiting-grid.component';
import { ToastrService } from 'ngx-toastr';
import { AulaService } from 'src/app/services/aula.service';
declare var $;

@Component({
  selector: 'app-usuario-perfil-clases',
  templateUrl: './usuario-perfil-clases.component.html',
  styleUrls: ['./usuario-perfil-clases.component.scss']
})
export class UsuarioPerfilClasesComponent implements OnInit {

  @Output() detalleClase = new EventEmitter<Clase>();
  paramId: number;
  clases: Clase[] = [];
  isAlumno = false;
  estados = new ClaseEstados();
  settings: any;
  instanciarGrilla: boolean;
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected as: SeguridadService,
    protected als: AlumnoService,
    protected ps: ProfesorService,
    private toastr: ToastrService,
    protected aulaService: AulaService,
  ) { }

  ngOnInit(): void
  {
    this.userId = this.as.getUser().id;
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
          value.data.forEach( i => {
            i.disabled = true;
            i.estadoHtml = `<div data-toggle="tooltip" title="${i.estado}" class="btn ${this.returnClassEstado(i.estado)}"><i class="fas fa"></i></div>`;  
          });
          this.clases = value.data;
          this.instanciarGrilla = true;
        }
      );

    } else {
      // get profesor
      this.ps.getClases(this.paramId).subscribe(
        (value: any) => {
          this.clases = [];
          value.data.forEach( i => {
              i.disabled = true;
              i.estadoHtml = `<div data-toggle="tooltip" title="${i.estado}" class="btn ${this.returnClassEstado(i.estado)}"><i class="fas fa"></i></div>`;  
          });
          this.clases = value.data;
          delete this.settings.columns.profesor;
          this.instanciarGrilla = true;
        }
      );
    }
  }

  returnClassEstado(estado: string) {
    switch (estado) {
      case 'Pendiente':
        return 'btn-info pendiente';
      case 'Finalizada':
        return 'btn-success finalizado';
      case 'En Curso':
        return 'btn-danger encurso';
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
            title: '<a class="btn btn-primary primary-button detalle" data-toggle="tooltip" title="Ver Detalle" href="#"><i class="fas fa-eye"></i></a>',
          },
          {
            name: 'ingresar',
            title: '<a class="btn btn-primary ingresar" href="#" data-toggle="tooltip" title="Iniciar Clase"><i class="fas fa-arrow-circle-right"></i></a>',
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
        profesor: {
          title: 'Profesor',
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
                    { value: 'Finalizada', title: 'Finalizada' },
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
        this.detalleClase.emit(event.data);
        break;
      case 'ingresar':
        this.iniciarClase(event.data);
        break;
    }
  }

  iniciarClase(e)
  {
    if (this.isAlumno) {
      this.aulaService.iniciarClaseAlumno(e.id, this.userId).subscribe(
        (value: any) =>
        {
          if (value.status === 'OK')
          {
            this.toastr.success('Clase iniciada');
            const win = window.open(value.data.urlJoin, '_blank');
            win.focus();
          } else
          {
            this.toastr.error('No se pudo iniciar la clase');
          }

        },
        error =>
        {
          this.toastr.error('Se produjo un error al iniciar la clase');
        }
      );

    }
    else
    {
      this.aulaService.iniciarClaseProfesor(e.id, this.userId).subscribe(
        (value: any) =>
        {
          if (value.status === 'OK')
          {
            this.toastr.success('Clase iniciada');
            const win = window.open(value.data.urlJoin, '_blank');
            win.focus();
          } else
          {
            this.toastr.error('No se pudo iniciar la clase');
          }

        },
        error =>
        {
          this.toastr.error('Se produjo un error al iniciar la clase');
        }
      );
    }
  }

}
