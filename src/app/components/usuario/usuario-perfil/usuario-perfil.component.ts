import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../../entities/usuario";
import { AlumnoService } from "../../../services/alumno.service";
import { ProfesorService } from "../../../services/profesor.service";
import { ActivatedRoute } from "@angular/router";
import { SeguridadService } from "../../../services/seguridad.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { FormsValidationService } from "../../../services/forms-validation.service";

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent implements OnInit {

  fg: FormGroup;
  usuario: Usuario = new Usuario();
  paramId: number;
  fileName = 'Seleccionar Archivo';
  active = 'navclases';
  isAlumno = false;
  cambiarPassword: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private fv: FormsValidationService,
    protected as: SeguridadService,
    protected als: AlumnoService,
    protected rateConfig: NgbRatingConfig,
    protected ps: ProfesorService,
  ) {
    rateConfig.max = 5;

  }

  ngOnInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.active = this.route.snapshot.paramMap.get('active') ? this.route.snapshot.paramMap.get('active') : 'navclases';

    this.isAlumno = this.as.isAlumno();
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
    if (this.as.getUser().tipoCliente === 'PROFESOR') {
      // load profesor
      this.ps.getProfesor(this.paramId).subscribe(
        (value: any) => {
          if (!value.data.foto) {
            value.data.foto = '/assets/icons/fa/fas-fa-user-circle-mod.svg';
          }
          this.usuario.apellido = value.data.apellido;
          this.usuario.nombre = value.data.nombre;
          this.usuario.nombreApellido = value.data.nombreApellido;
          this.usuario.username = value.data.username;
          this.usuario.telefonoFijo = value.data.telefonoFijo;
          this.usuario.telefonoMovil = value.data.telefonoMovil;
          this.usuario.tipoIdentificacion = value.data.tipoIdentificacion;
          this.usuario.numeroIdentificacion = value.data.numeroIdentificacion;
          this.usuario.foto = value.data.foto;
          this.usuario.institucion = value.data.institucion;
          // Propios del profesor
          this.usuario.calificacion = value.data.calificacion || 5;
          this.usuario.descripcion = value.data.descripcion;
        }
      );
    } else {
      // load alumno
      this.als.getAlumno(this.paramId).subscribe(
        (value: any) => {
          if (!value.data.foto) {
            value.data.foto = '/assets/icons/fa/fas-fa-user-circle-mod.svg';
          }
          this.usuario.apellido = value.data.apellido;
          this.usuario.nombre = value.data.nombre;
          this.usuario.nombreApellido = value.data.nombreApellido;
          this.usuario.username = value.data.username;
          this.usuario.telefonoFijo = value.data.telefonoFijo;
          this.usuario.telefonoMovil = value.data.telefonoMovil;
          this.usuario.tipoIdentificacion = value.data.tipoIdentificacion;
          this.usuario.numeroIdentificacion = value.data.numeroIdentificacion;
          this.usuario.foto = value.data.foto;
          this.usuario.institucion = value.data.institucion;
        }
      );
    }




  }

}
