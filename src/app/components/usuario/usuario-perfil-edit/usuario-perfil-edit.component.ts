import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Usuario } from "../../../entities/usuario";
import { ActivatedRoute } from "@angular/router";
import { FormsValidationService } from "../../../services/forms-validation.service";
import { SeguridadService } from "../../../services/seguridad.service";
import { AlumnoService } from "../../../services/alumno.service";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { ProfesorService } from "../../../services/profesor.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-perfil-edit',
  templateUrl: './usuario-perfil-edit.component.html',
  styleUrls: ['./usuario-perfil-edit.component.scss']
})
export class UsuarioPerfilEditComponent implements OnInit {

  @Input() parentGroup: FormGroup;

  @Output() cambiarPassword = new EventEmitter();
  paramId: number;
  fileName = 'Seleccionar Archivo';
  isAlumno = false;
  fotoPerfil: File = null;
  usuarioLogueado: Usuario;

  constructor(
    private route: ActivatedRoute,
    private fv: FormsValidationService,
    public as: SeguridadService,
    private alumnoService: AlumnoService,
    protected rateConfig: NgbRatingConfig,
    private toastr: ToastrService,
    protected profesorService: ProfesorService,
  ) {
    rateConfig.max = 5;


  }

  ngOnInit(): void
  {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.isAlumno = this.as.isAlumno();
    this.usuarioLogueado = this.as.getUser();
  }

  onSubmit() {
    if (this.parentGroup.valid) {

      if (this.isAlumno)
      {
        this.alumnoService.setAlumno(this.parentGroup.value).subscribe(
          value => {
            if (value.status === 'OK') {
              this.toastr.success('Se guardó correctamente');
            } else {
              this.toastr.error(value.data);
            }
          },
          error => {
            this.toastr.error('No se pudo guardar el perfil');
          }
        );
      } else {
        this.profesorService.setProfesor(this.parentGroup.value).subscribe(
          value => {
            if (value.status === 'OK') {
              this.toastr.success('Se guardó correctamente');
            } else {
              this.toastr.error(value.data);
            }
          },
          error => {
            this.toastr.error('No se pudo guardar el perfil');
          }
        );
      }

    } else {
      this.toastr.error('Por favor complete los datos requeridos.');
    }
  }

  public get usuario(): any {
    return this.parentGroup.controls;
  }

  getDisabled() {
    return this.parentGroup.pristine || !this.parentGroup.valid;
  }

}
