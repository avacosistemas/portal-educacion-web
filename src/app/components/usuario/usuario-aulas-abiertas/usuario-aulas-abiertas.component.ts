import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Aula } from 'src/app/entities/aula';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AulaService } from 'src/app/services/aula.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-usuario-aulas-abiertas',
  templateUrl: './usuario-aulas-abiertas.component.html',
  styleUrls: ['./usuario-aulas-abiertas.component.scss'],
  providers: [DatePipe]
})
export class UsuarioAulasAbiertasComponent implements OnInit {

  @Output() detalleAula = new EventEmitter<Aula>();
  paramId: number;
  aulas: Aula[] = [];
  isAlumno = false;
  settings: any;
  instanciarGrilla: boolean;
  userId: number;

  constructor(
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
    this.isAlumno = this.as.isAlumno();
    this.loadData();
  }

  loadData()
  {
    if (this.isAlumno)
    {
      // get Alumno
      this.als.getAulas(this.userId)
      .subscribe(
        (value: any) => {
          this.aulas = [];
          this.aulas = value.data;
          this.instanciarGrilla = true;
        }
      );

    }
    
    // else {
    //   // get profesor
    //   this.ps.getAulas()
    //   .subscribe(
    //     (value: any) => {
    //       this.aulas = [];
    //       this.aulas = value.data;
    //       delete this.settings.columns.profesor;
    //       this.instanciarGrilla = true;
    //     }
    //   );
    // }
  }

  sortDate = (direction: any, a: string, b: string): number => {
    const splitDateFirst = a.split('/');
    const first = new Date(+splitDateFirst[2], +splitDateFirst[1] - 1, +splitDateFirst[0]);

    const splitDateSecond = b.split('/');
    const second = new Date(+splitDateSecond[2], +splitDateSecond[1] - 1, +splitDateSecond[0]);

    if (first < second) {
        return -1 * direction;
    }
    if (first > second) {
        return direction;
    }
    return 0;
  }

  setupGrilla() {
    this.settings = {
      noDataMessage: 'No hay registros',
      actions: {
        custom: [
          {
            name: 'solicitar',
            title: '<a class="btn btn-primary primary-button detalle" data-toggle="tooltip" title="Solicitar Unirse" href="#"><i class="fas fa-pen"></i></a>',
          },
        ],
        add: false,
        edit: false,
        delete: false,
        columnTitle: '',
        position: 'right'
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
          width: '10%',
          type: 'date',
          compareFunction: this.sortDate
        },
        hora: {
          title: 'Hora',
          filter: true,
          editable: false,
          width: '10%'
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
      case 'solicitar':
        this.iniciarAula(event.data);
        break;
    }
  }

  iniciarAula(e)
  {
    this.aulaService.unirse(e.id, this.userId)
    .subscribe(
      (value: any) =>
      {
        if (value.status === 'OK')
        {
          this.toastr.success('Se envío correctamente la solicitud');
        } else
        {
          this.toastr.error('No se pudo unirse al aula');
        }

      },
      error =>
      {
        this.toastr.error('Se produjo un error al unirse');
      }
    );
  }
}
