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
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AulaService } from "../../../services/aula.service";

@Component({
  selector: 'app-clase-detalle',
  templateUrl: './clase-detalle.component.html',
  styleUrls: ['./clase-detalle.component.scss']
})
export class ClaseDetalleComponent implements OnInit {

  @Output() goBack = new EventEmitter();
  @Input() idClase: number;

  anotaciones = new Anotaciones();
  isAlumno = false;
  userId = 0;
  userName: string;
  clase: Clase;
  fg: FormGroup; // Chat
  fge: FormGroup; // Encuesta
  rate: 0;

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
      txtComentario: [null, [ Validators.required, Validators.minLength(4), Validators.maxLength(250)]],
    });

    this.loadData();
  }

  get txtRespuesta() { return this.fg.get('txtRespuesta'); }
  get txtComentario() { return this.fge.get('txtComentario'); }

  menuSelected(menu: string) {
    this.headerService.setMenuSelected(menu);
    this.router.navigate([ '/usuario/' + this.userId]);
  }

  loadData() {

    if (this.isAlumno) {
      this.als.getClase(this.userId, this.idClase).subscribe(
        (value: any) => {
          this.clase = value.data;
        }
      );
    } else {
      // Datos de la Clase
      this.ps.getClase(this.userId, this.idClase).subscribe(
        (value: any) => {
          this.clase = value.data;
        }
      );
    }

    this.obtenerChat();

  }

  obtenerChat() {
    // Datos del Chat
    this.ps.getAnotaciones(this.userId, this.idClase).subscribe(
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
            )
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
        this.als.sendAnotacion(this.userId, this.idClase, this.txtRespuesta.value).subscribe(
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
        this.ps.sendAnotacion(this.userId, this.idClase, this.txtRespuesta.value).subscribe(
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

  iniciarClase(e)
  {
    if (this.isAlumno) {
      this.aulaService.iniciarClaseAlumno(this.idClase, this.userId).subscribe(
        (value: any) =>
        {
          if (value.status == 'OK')
          {
            this.toastr.success('Clase iniciada\n' + value.data);
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
      this.aulaService.iniciarClaseProfesor(this.idClase, this.userId).subscribe(
        (value: any) =>
        {
          if (value.status == 'OK')
          {
            this.toastr.success('Clase iniciada\n' + value.data);
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
    this.als.sendCalificacion(this.userId,this.idClase, this.rate, this.txtComentario.value).subscribe(
      (value: any) =>
      {
        if (value.status == 'OK')
        {
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
