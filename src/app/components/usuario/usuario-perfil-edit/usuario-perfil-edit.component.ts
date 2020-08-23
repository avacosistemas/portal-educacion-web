import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Usuario } from "../../../entities/usuario";
import { ActivatedRoute } from "@angular/router";
import { FormsValidationService } from "../../../services/forms-validation.service";
import { SeguridadService } from "../../../services/seguridad.service";
import { AlumnoService } from "../../../services/alumno.service";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { ProfesorService } from "../../../services/profesor.service";

@Component({
  selector: 'app-usuario-perfil-edit',
  templateUrl: './usuario-perfil-edit.component.html',
  styleUrls: ['./usuario-perfil-edit.component.scss']
})
export class UsuarioPerfilEditComponent implements OnInit {

  fg: FormGroup;
  usuario: Usuario = new Usuario();
  paramId: number;
  fileName = 'Seleccionar Archivo';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private fv: FormsValidationService,
    public as: SeguridadService,
    protected als: AlumnoService,
    protected rateConfig: NgbRatingConfig,
    protected ps: ProfesorService,
  ) {
    rateConfig.max = 5;

  }

  ngOnInit(): void
  {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.fg = this.fb.group({
      nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellido: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      dni: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      username: [null],
      institucion: [null],
      email: [null, [Validators.required, this.fv.correo()]],
      telCel: [null, [Validators.required, Validators.minLength(10), this.fv.telefono()]],
      telFijo: [null, [Validators.minLength(10), this.fv.telefono()]],
    });
    this.loadData();
  }

  // ======================= Getters ==========================
  get nombre() { return this.fg.get('nombre'); }
  get apellido() { return this.fg.get('apellido'); }
  get dni() { return this.fg.get('dni'); }
  get username() { return this.fg.get('username'); }
  get institucion() { return this.fg.get('institucion'); }
  get email() { return this.fg.get('email'); }
  get telCel() { return this.fg.get('telCel'); }
  get telFijo() { return this.fg.get('telFijo'); }

  selectFile(e) {
    console.log(e);
    if (e.target.files.length > 0) {
      this.fileName = e.target.files[0].name;
      this.fg.markAsTouched();
    }
  }


  loadData() {
    if (this.as.getUser().tipoCliente == 'PROFESOR') {
      // load profesor
      this.ps.getProfesor(this.paramId).subscribe(
        (value:any) => {
          if (!value.data.foto) {
            value.data.foto = '/assets/icons/fa/fas-fa-user-circle-mod.svg';
          }
          this.usuario.tipoCliente = 'PROFESOR'
          this.usuario.apellido = value.data.apellido;
          this.usuario.nombre = value.data.nombre;
          this.usuario.nombreApellido = value.data.nombreApellido;
          this.usuario.username = value.data.username;
          this.usuario.email = value.data.email;
          this.usuario.telefonoFijo = value.data.telefonoFijo;
          this.usuario.telefonoMovil = value.data.telefonoMovil;
          this.usuario.tipoIdentificacion = value.data.tipoIdentificacion;
          this.usuario.numeroIdentificacion = value.data.numeroIdentificacion;
          this.usuario.foto = value.data.foto;
          this.usuario.institucion = value.data.institucion;
          // Propios del profesor
          this.usuario.calificacion = value.data.calificacion;
          this.usuario.descripcion = value.data.descripcion;
          this.setFormData();
        }
      );
    } else {
      // load alumno
      this.als.getAlumno(this.paramId).subscribe(
        (value:any) => {
          if (!value.data.foto) {
            value.data.foto = '/assets/icons/fa/fas-fa-user-circle-mod.svg';
          }
          this.usuario.tipoCliente = 'ALUMNO'
          this.usuario.apellido = value.data.apellido;
          this.usuario.nombre = value.data.nombre;
          this.usuario.nombreApellido = value.data.nombreApellido;
          this.usuario.username = value.data.username;
          this.usuario.email = value.data.email;
          this.usuario.telefonoFijo = value.data.telefonoFijo;
          this.usuario.telefonoMovil = value.data.telefonoMovil;
          this.usuario.tipoIdentificacion = value.data.tipoIdentificacion;
          this.usuario.numeroIdentificacion = value.data.numeroIdentificacion;
          this.usuario.foto = value.data.foto;
          this.usuario.institucion = value.data.institucion;
          this.setFormData();
        }
      );
    }

  }

  setFormData() {

    this.nombre.setValue(this.usuario.nombre);
    this.apellido.setValue(this.usuario.apellido);
    this.dni.setValue(this.usuario.numeroIdentificacion);
    this.username.setValue(this.usuario.username);
    this.institucion.setValue(this.usuario.institucion);
    this.email.setValue(this.usuario.email);
    this.telCel.setValue(this.usuario.telefonoMovil);
    this.telFijo.setValue(this.usuario.telefonoFijo);

  }


  onSubmit() {
    if (this.fg.valid) {

      this.usuario.nombre = this.nombre.value;
      this.usuario.apellido = this.apellido.value;
      this.usuario.institucion = this.institucion.value;
      this.usuario.username = this.username.value;
      this.usuario.numeroIdentificacion = this.dni.value;
      this.usuario.email = this.email.value;
      this.usuario.telefonoMovil = this.telCel.value;
      this.usuario.telefonoFijo = this.telFijo.value;

      this.ps.setProfesor(this.usuario).subscribe(
        value => {
          if (value.status == 'OK') {
            alert('Se guardó correctamente');
          }
        },
        error => {
          console.error(error);
          alert('No se pudo guardar el perfil');
        }
      );

    } else {
      console.error('El formulario contiene errores')
    }
  }

}
