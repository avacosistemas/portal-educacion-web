import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SeguridadService } from "../../services/seguridad.service";
import { ProfesorService } from "../../services/profesor.service";
import { Pregunta } from "../../entities/pregunta";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { PreguntasResponderComponent } from "./preguntas-responder/preguntas-responder.component";
declare var $;

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {

  @ViewChild('contentRespuesta', { static: true }) contentModal: ElementRef;

  userId = 0;  isAlumno = false;
  preguntas: Pregunta[];
  qId: number = 0;
  respuesta: string;
  pregunta: string;
  fg: FormGroup;
  settings: any;

  constructor(
    protected as: SeguridadService,
    private fb: FormBuilder,
    protected ps: ProfesorService,
    private modalService: NgbModal,
    protected toastr: ToastrService,
  ) {
    this.userId = as.getUser().id;
    this.isAlumno = as.isAlumno();
  }

  ngOnInit(): void {

    this.setGrilla();
    this.loadData();
    this.fg = this.fb.group({
      txtRespuesta: [null,[Validators.required, Validators.minLength(4), Validators.maxLength(250)]],
    });
  }

  get txtRespuesta() { return this.fg.get('txtRespuesta'); }

  loadData() {
    this.ps.getPreguntas(this.userId).subscribe(
      (value: any) => {
        this.preguntas = value.data;
      },
      error => {
        this.toastr.error('Se produjo un error al tratar de recuperar las preguntas')
        console.log(error);
      }
    );
  }

  setGrilla() {
    this.settings = {
      actions: {
        custom: [
          {
            name: 'responder',
            title: '<a class="btn btn-primary" href="#"><i class="far fa-comment"></i></a>',
          }
        ],
        add: false,
        edit: false,
        delete: false,
        columnTitle: '',
        position: 'right'
      },
      rowClassFunction: (row) => {
        if (row.data.respuesta){
            return 'hide-action';
        } else {
            return '';
        }
      },
      columns: {
        fechaPregunta: {
          title: 'Fecha / Hora',
          width: '10%'
        },
        pregunta: {
          title: 'Pregunta'
        },
        respuesta: {
          title: 'Respuesta'
        }
      }
    };
  }

  onCustomAction(event) {
    switch ( event.action) {
      case 'responder':
        this.openModal(event.data);
        break;
    }
  }

  openModal(question: Pregunta) {
      this.qId = question.id;
      this.pregunta = question.pregunta;
      this.modalService.open(this.contentModal, {size: 'lg', scrollable: true, centered: true});
  }


  Responder(event)
  {
    this.ps.sendRespuesta(this.qId, this.txtRespuesta.value).subscribe(
      (value: any) => {
        if (value && value.status === 'OK')
        {
          this.toastr.success('La respuesta se guardó correctamente');
        } else if (value && value.status === 'ERROR') {
          this.toastr.error('No se pudo guardar la respuesta. \n' + value.data);
        }
      }
      , error => {
        this.toastr.success('No se pudo guardar la respuesta');
      }
    );
  }

}
