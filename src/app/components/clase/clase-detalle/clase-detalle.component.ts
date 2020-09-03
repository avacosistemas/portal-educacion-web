import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {Location} from '@angular/common';
import { SeguridadService } from '../../../services/seguridad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../../../services/alumno.service';
import { ProfesorService } from '../../../services/profesor.service';
import { Clase } from '../../../entities/clase';
import { HeaderService } from '../../../services/header.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Anotaciones } from '../../../entities/anotaciones';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AulaService } from '../../../services/aula.service';

@Component({
  selector: 'app-clase-detalle',
  templateUrl: './clase-detalle.component.html',
  styleUrls: ['./clase-detalle.component.scss']
})
export class ClaseDetalleComponent implements OnInit {

  @Output() goBack = new EventEmitter();
  @Input() clase: Clase;

  anotaciones = new Anotaciones();
  isAlumno = false;
  userId = 0;
  userName: string;
  claseDetalle: Clase;
  fg: FormGroup; // Chat
  fge: FormGroup; // Encuesta
  rate: number;

  constructor(
    private route: ActivatedRoute,
    protected as: SeguridadService,
    protected als: AlumnoService,
    protected aulaService: AulaService,
    protected ps: ProfesorService,
    private toastr: ToastrService,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private location: Location,
    protected rateConfig: NgbRatingConfig,
    protected router: Router,
  ) {
    rateConfig.max = 5;

  }

  ngOnInit(): void {
    this.isAlumno = this.as.isAlumno();
    this.userId = this.as.getUser().id;
    this.userName = this.as.getUser().nombreApellido;

    this.fg = this.fb.group({
      txtRespuesta: [null, [ Validators.required, Validators.minLength(4), Validators.maxLength(250)]],
    });
    this.fge = this.fb.group({
      comentario: [null, [ Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      puntuacion: [null, [Validators.required]]
    });

    this.loadData();
  }

  get txtRespuesta() { return this.fg.get('txtRespuesta'); }
  get txtComentario() { return this.fge.get('comentario'); }
  get calificacion() { return this.fge.get('puntuacion'); }

  menuSelected(menu: string) {
    this.headerService.setMenuSelected(menu);
    this.router.navigate([ '/usuario/' + this.userId]);
  }

  loadData() {

    if (this.isAlumno) {
      this.als.getClase(this.userId, this.clase.id).subscribe(
        (value: any) => {
          this.claseDetalle = value.data;
          this.rate = this.claseDetalle.puntuacion;
          this.fge.patchValue(this.claseDetalle);
        }
      );
    } else {
      // Datos de la Clase
      this.ps.getClase(this.userId, this.clase.id).subscribe(
        (value: any) => {
          this.claseDetalle = value.data;
          this.rate = this.claseDetalle.puntuacion;
        }
      );
    }

    this.obtenerChat();

  }

  obtenerChat() {
    // Datos del Chat
    this.ps.getAnotaciones(this.userId, this.clase.id).subscribe(
      (value: any) => {
        if (value.status === 'OK') {
          this.anotaciones.chat = [];
          value.data.forEach(m => {
            this.anotaciones.chat.push(
              {
                fromName: m.nombre,
                message: m.comentario,
                fechaHora: m.fechaHora,
                isAvatarImg: false,
                align: (this.userName === m.nombre ? 'right' : 'left'),
                avatar: (this.userName === m.nombre ? 'fas fa-user-circle' : 'far fa-user-circle'),
              }
            );
          });

        } else {
          this.toastr.error('No se pudieron cargar las anotaciones');
        }
      } ,
      (error) => {
        //
      }
    );
  }

  enviarRespuesta($event: MouseEvent)
  {
    if (this.txtRespuesta.value) {
      if (this.isAlumno) {
        this.als.sendAnotacion(this.userId, this.clase.id, this.txtRespuesta.value).subscribe(
          (value: any) =>
          {
            if (value.status === 'OK')
            {
              this.toastr.success('El mensaje se guardó correctamente');
              this.txtRespuesta.setValue('');
              this.obtenerChat();
            } else
            {
              this.toastr.error('No se pudo enviar la anotación');
            }
          },
          (error) =>
          {
            this.toastr.error('No se pudo enviar la anotación');
            console.error(error);
          }
        );
      }
      else
      {
        // Mensaje del profesor
        this.ps.sendAnotacion(this.userId, this.clase.id, this.txtRespuesta.value).subscribe(
          (value: any) =>
          {
            if (value.status === 'OK')
            {
              this.toastr.success('El mensaje se guardó correctamente');
              this.txtRespuesta.setValue('');
              this.obtenerChat();
            } else
            {
              this.toastr.error('No se pudo enviar la anotación');
            }
          },
          (error) =>
          {
            this.toastr.error('No se pudo enviar la anotación');
            console.error(error);
          }
        );
      }

    } else {
      this.toastr.error('Ingrese un comentario');
    }

  }

  getIniciarClase(): boolean {
    if (this.claseDetalle && this.claseDetalle.dia) {
      const hoy = new Date();
      const diaSeparado = this.claseDetalle.dia.split('/');
      const fechaInicio = new Date(+diaSeparado[2], (+diaSeparado[1]) - 1, +diaSeparado[0], +this.claseDetalle.hora, 0, 0);
      const fechaFin = new Date(+diaSeparado[2], (+diaSeparado[1]) - 1, +diaSeparado[0], (+this.claseDetalle.hora) + 1, 0, 0);

      if (hoy <= fechaFin && hoy >= fechaInicio) {
        return true;
      }
    }
    return false;
  }

  iniciarClase(e)
  {
    if (this.isAlumno) {
      this.aulaService.iniciarClaseAlumno(this.clase.id, this.userId).subscribe(
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
      this.aulaService.iniciarClaseProfesor(this.clase.id, this.userId).subscribe(
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

  calificar(e)
  {
    e.preventDefault();

    if (!this.rate || this.fge.invalid) {
      this.toastr.error('Complete los datos requeridos.');
      return;
    }

    this.als.sendCalificacion(this.userId, this.clase.id, this.rate, this.txtComentario.value).subscribe(
      (value: any) =>
      {
        if (value.status === 'OK')
        {
          this.fge.controls.puntuacion.patchValue(this.rate);
          this.toastr.success('Gracias por calificar la clase');
        } else
        {
          this.toastr.error('No se pudo calificar la clase');
        }

      },
      error =>
      {
        this.toastr.error('Se produjo un error al calificar la clase');
      }
    );
  }
}
