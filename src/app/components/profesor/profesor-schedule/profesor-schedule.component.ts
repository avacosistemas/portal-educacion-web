import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/entities/profesor';
import { ProfesorService } from "../../../services/profesor.service";
import { ActivatedRoute } from "@angular/router";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AlumnoService } from "../../../services/alumno.service";
import { SeguridadService } from "../../../services/seguridad.service";
import { Mensaje } from "../../../entities/mensaje";
import { ToastrService } from "ngx-toastr";
import { Anotaciones } from "../../../entities/anotaciones";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-profesor-schedule',
  templateUrl: './profesor-schedule.component.html',
  styleUrls: [ './profesor-schedule.component.scss' ]
})
export class ProfesorScheduleComponent implements OnInit {

  profesor: Profesor;
  profesorIdParam: number;
  anotaciones = new Anotaciones();

  horarios: string[] = [];

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  fg: FormGroup;
  userIdLogged = 0;
  isAlumno = false;

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

  }

  ngOnInit(): void {
    this.fg = this.fb.group({
      txtRespuesta: [null, [ Validators.required, Validators.minLength(4), Validators.maxLength(250)]],
    });

    this.loadData();
  }

  get txtRespuesta() { return this.fg.get('txtRespuesta'); }

  loadData() {
    this.profesorIdParam = Number(this.route.snapshot.paramMap.get('id'));
    this.ps.getProfesor(this.profesorIdParam).subscribe(
      (value: any) => {

        if (value.data?.foto == null) {
          value.data.foto = '/assets/icons/fa/fas-fa-user-circle-mod.svg';
        }

        this.profesor = value.data;

        this.loadPreguntas();

      }
    );

  }


  loadPreguntas() {
    this.ps.getPreguntas(this.profesorIdParam).subscribe(
      (value:any) => {
        if (value.status == 'OK') {
          this.anotaciones.chat = [];
          value.data.forEach( q => {
            this.anotaciones.chat.push({
              message: q.pregunta,
              fechaHora: q.fechaPregunta,
              fromName: q.nombreAlumno,
              avatar: 'far fa-user-circle',
              align: 'right'
            })
            if (q.respuesta) {
              this.anotaciones.chat.push({
                message: q.respuesta,
                fechaHora: q.fechaRespuesta,
                fromName: this.profesor.nombreApellido,
                avatar: 'fas fa-user-circle',
                align: 'left'
              })
            }

            // avatar: (this.userName === m.nombre ? 'fas fa-user-circle' : 'far fa-user-circle'),

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
    e.preventDefault();
    if (this.userIdLogged > 0 && this.isAlumno)
    {
      this.als.sendPregunta(this.profesor.id, this.userIdLogged, this.txtRespuesta.value).subscribe(
        (value:any) => {
          if (value.status == 'OK') {
            this.toastr.success('Pregunta enviada correctamente');
            this.loadPreguntas();
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

    this.ps.getHorarios(this.fromDate, this.profesorIdParam).subscribe(
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
}
