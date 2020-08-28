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
export class UsuarioPerfilEditComponent implements OnInit, OnChanges {

  @Input() usuario: Usuario;
  @Output() cambiarPassword = new EventEmitter();
  fg: FormGroup;
  paramId: number;
  fileName = 'Seleccionar Archivo';
  isAlumno = false;
  fotoPerfil: File = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private fv: FormsValidationService,
    public as: SeguridadService,
    private alumnoService: AlumnoService,
    protected rateConfig: NgbRatingConfig,
    private toastr: ToastrService,
    protected profesorService: ProfesorService,
  ) {
    rateConfig.max = 5;

    this.fg = this.fb.group({
      nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellido: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      numeroIdentificacion: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      username: [null],
      institucion: [null],
      email: [null, [Validators.required, this.fv.correo()]],
      telefonoMovil: [null, [Validators.required, Validators.minLength(10), this.fv.telefono()]],
      telefonoFijo: [null, [Validators.minLength(10), this.fv.telefono()]],
      id: [],
      foto: []
    });
  }

  ngOnInit(): void
  {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.isAlumno = this.as.isAlumno();
  }

  ngOnChanges() {
    this.fg.patchValue(this.usuario);
  }

  // ======================= Getters ==========================
  get nombre() { return this.fg.get('nombre'); }
  get apellido() { return this.fg.get('apellido'); }
  get dni() { return this.fg.get('numeroIdentificacion'); }
  get username() { return this.fg.get('username'); }
  get institucion() { return this.fg.get('institucion'); }
  get email() { return this.fg.get('email'); }
  get telCel() { return this.fg.get('telefonoMovil'); }
  get telFijo() { return this.fg.get('telefonoFijo'); }

  onSubmit() {
    if (this.fg.valid) {

      if (this.usuario.foto) {
        this.fg.controls.foto.patchValue(this.usuario.foto);
      }

      if (this.isAlumno)
      {
        this.alumnoService.setAlumno(this.usuario).subscribe(
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
        this.profesorService.setProfesor(this.fg.value).subscribe(
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

}
