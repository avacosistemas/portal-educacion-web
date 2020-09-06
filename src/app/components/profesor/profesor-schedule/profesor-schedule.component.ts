import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/entities/profesor';
import { ProfesorService } from "../../../services/profesor.service";
import { ActivatedRoute } from "@angular/router";
import { NgbDateStruct, NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AlumnoService } from "../../../services/alumno.service";
import { SeguridadService } from "../../../services/seguridad.service";
import { Mensaje } from "../../../entities/mensaje";
import { ToastrService } from "ngx-toastr";
import { Anotaciones } from "../../../entities/anotaciones";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Materia } from "../../../entities/materia";
import { Horario } from "../../../entities/horario";
import { RaitingGridComponent } from '../../usuario/usuario-perfil-clases/raiting-grid/raiting-grid.component';

@Component({
  selector: 'app-profesor-schedule',
  templateUrl: './profesor-schedule.component.html',
  styleUrls: [ './profesor-schedule.component.scss' ]
})
export class ProfesorScheduleComponent implements OnInit {

  profesor: Profesor;
  profesorIdParam: number;
  anotaciones = new Anotaciones();
  materias: Materia[] = [];

  horarios: string[] = [];
  horariosClases: Horario[] = [];
  imgSrc: string | ArrayBuffer;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  fg: FormGroup;
  userIdLogged = 0;
  isAlumno = false;
  cantidadComentarios = 3;
  cantidadCalendarios = 1;

  constructor(
    protected ps: ProfesorService,
    protected als: AlumnoService,
    private route: ActivatedRoute,
    protected rateConfig: NgbRatingConfig,
    private toastr: ToastrService,
    protected calendar: NgbCalendar,
    private fb: FormBuilder,
    protected as: SeguridadService
  )
  {
    if (this.as.isLogged())
    {
      this.isAlumno = this.as.isAlumno();
      this.userIdLogged = this.as.getUser().id;
    }

    this.profesor = new Profesor();
    rateConfig.max = 5;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    if (window.screen.width > 360) {
      this.cantidadCalendarios = 2;
    }
  }

  ngOnInit(): void {
    this.profesorIdParam = Number(this.route.snapshot.paramMap.get('id'));
    this.fg = this.fb.group({
      txtRespuesta: [null, [ Validators.required, Validators.minLength(4), Validators.maxLength(250)]],
    });

    this.loadData();
  }

  get txtRespuesta() { return this.fg.get('txtRespuesta'); }

  loadData() {
    this.ps.getProfesorCatalogo(this.profesorIdParam).subscribe(
      (value: any) => {

        this.profesor = value.data;
        if (this.profesor.foto === null ) {
            this.profesor.foto = '/assets/icons/fa/fas-fa-user-circle-mod.svg';
        } else {
          // debería venir una URL por cuestiones de performance
          if (this.profesor.foto.length > 300)
          {
            // debería venir del data:image porque podría ser otro formato. asumir que siempre va a ser de este tipo es un error.
            this.profesor.foto = `data:image/jpg;base64,${this.profesor.foto}`;
          }
        }

        this.profesor.titulo = this.profesor.titulo || 'Profesor';

        this.loadPreguntas();

      }
    );

    this.ps.getMaterias(this.profesorIdParam).subscribe(
      (value: any) => {
        if ( value.status == 'OK')
        {
          value.data.forEach( m => {
            this.materias.push({
              id: m.idMateria,
              nombre: m.descMateria,
              idNivel: m.idNivel,
              nivelNombre: m.descNivel
            });
          });
        } else {
          this.toastr.error('Se produjo un error al recuperar las materias');
          this._mockMaterias();
        }
      },
      error => {
        this.toastr.error('Se produjo un error al recuperar las materias');
        this._mockMaterias();
      }
    );

  }

  mostrarMasPreguntas(e) {
    if (this.cantidadComentarios === 3) {
      this.cantidadComentarios = 999;
    } else {
      this.cantidadComentarios = 3;
    }
  }

  loadPreguntas() {
    this.ps.getCatalogoConsultas(this.profesorIdParam).subscribe(
      (value: any) => {
        if (value.status === 'OK') {
          this.anotaciones.chat = [];
          value.data.forEach( q => {
            this.anotaciones.chat.push({
              message: q.pregunta,
              fechaHora: q.fechaPregunta,
              fromName: q.nombreAlumno,
              avatar: '<i class="far fa-user-circle avatar-user"></i>',
              align: 'left'
            });
            if (q.respuesta) {
              this.anotaciones.chat.push({
                message: q.respuesta,
                fechaHora: q.fechaRespuesta,
                fromName: this.profesor.nombreApellido,
                avatar:  `<img src="${this.profesor.foto}" alt="" class="avatar-user" />` ,
                align: 'right'
              });
            }
          });

        } else {
          this.toastr.error('Se produjo un error intentando recuperar las preguntas');
        }

      } ,
      error => {
        this.toastr.error('Se produjo un error intentando recuperar las preguntas');
      }
    );

  }


  sendPregunta(e) {
    if (!this.txtRespuesta.value) {
      this.toastr.warning('Debe ingresar una preguntar.');
      return;
    }
    e.preventDefault();
    if (this.userIdLogged > 0 && this.isAlumno)
    {
      this.als.sendPregunta(this.profesor.id, this.userIdLogged, this.txtRespuesta.value).subscribe(
        (value: any) => {
          if (value.status === 'OK') {
            this.toastr.success('Pregunta enviada correctamente');
            this.loadPreguntas();
            this.txtRespuesta.setValue('');
          }
        },
        error => {
          this.toastr.error('Se produjo un error al enviar la pregunta.')
        }
      );


    } else {
      this.toastr.info('Solo los alumnos inscriptos pueden enviarle preguntas al profesor');
    }
  }

  enviarConsulta(event) {
    event.preventDefault();
    let msg: Mensaje = {
      fromId: this.as.getUser().id,
      toId: this.profesorIdParam,
      message: ''
    };

    // TODO hacer el servicio
    this.als.sendMessage(msg);


  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if (!this.fromDate) return;

    const cDate = this.fromDate.year.toString()
      + this.fromDate.month.toString().padStart(2,'0')
      + this.fromDate.day.toString().padStart(2,'0');

    this.ps.getHorarios(this.profesorIdParam, cDate).subscribe(
      (value:any) => {
        if ( value.status == 'OK') {
          if (value.data?.length > 0) {
            // Get horarios
            this.horariosClases = [];
            value.data.forEach(h => {
              this.horariosClases.push({
                id: h.id,
                dia: h.dia,
                hora: h.hora,
                numeroDia: h.numeroDia,
                rangoHora: h.rangoHora,
              });
            });

          } else  {
            this.toastr.info('No hay horarios para la fecha seleccionada. Intente con otra fecha');
          }
        } else {
          this.toastr.warning('No se encontaron horarios disponibles Se produjo un error al obtner los horaios')
        }
      },
      error => {
        this.toastr.error('Se produjo un error al obtner los horaios')
      }
    );

    this.ps.getHorariosMocked(this.fromDate, this.profesorIdParam).subscribe(
      data => {
        this.horarios = data;
      }
    )

  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  disableDays(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    // return date.day==18 || d.getDay() === 0 || d.getDay() === 6;
    return d.getDay() === 0 || d.getDay() === 6;
  }

  _mockMaterias(){
    this.materias = [
      { id: 1, nombre: 'Historia Argentina' },
      { id: 2, nombre: 'Historia Contemporanea Europea'},
      { id: 3, nombre: 'Historia de los pueblos originarios'},
    ];
  }
}

