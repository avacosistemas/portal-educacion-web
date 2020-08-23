import { Component, OnInit } from '@angular/core';
import { Alumno } from "../../../entities/alumno";
import { ActivatedRoute } from "@angular/router";
import { AlumnoService } from "../../../services/alumno.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormsValidationService } from "../../../services/forms-validation.service";

@Component({
  selector: 'app-alumno-perfil',
  templateUrl: './alumno-perfil.component.html',
  styleUrls: ['./alumno-perfil.component.scss']
})
export class AlumnoPerfilComponent implements OnInit {

  fg: FormGroup;
  alumno: Alumno;
  paramId: number;

  fileName = 'Seleccionar Archivo';

  constructor(
    private fb: FormBuilder,
    private fv: FormsValidationService,
    private route: ActivatedRoute,
    private als: AlumnoService,
  ) {
    this.alumno = new Alumno();
  }


  ngOnInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));

    this.fg = this.fb.group({
      nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellido: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      dni: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      usuario: [null],
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
  get usuario() { return this.fg.get('usuario'); }
  get institucion() { return this.fg.get('institucion'); }
  get email() { return this.fg.get('email'); }
  get telCel() { return this.fg.get('telCel'); }
  get telFijo() { return this.fg.get('telFijo'); }


  loadData(){
    this.als.getAlumno(this.paramId).subscribe(
      (value:any) => {
        if (!value.data.foto) {
          value.data.foto = '/assets/icons/fa/fas-fa-user-circle-mod.svg';
        }
        this.alumno = value.data;
        this.nombre.setValue(value.data.nombre);
        this.apellido.setValue(value.data.apellido);
        this.dni.setValue(value.data.numeroIdentificacion);
        this.usuario.setValue(value.data.username);
        this.institucion.setValue(value.data.institucion);
        this.email.setValue(value.data.email);
        this.telCel.setValue(value.data.telefonoMovil);
        this.telFijo.setValue(value.data.telefonoFijo);
      }
    );
  }

  onSubmit() {
    if (this.fg.valid) {
      this.alumno.apellido = this.apellido.value;
      this.alumno.nombre = this.nombre.value;
      this.alumno.numeroIdentificacion = this.dni.value;
      this.alumno.email = this.email.value;
      this.alumno.telefonoMovil = this.telCel.value;
      this.alumno.telefonoFijo = this.telFijo.value;
      this.als.setAlumno(this.alumno).subscribe(
        (value:any) => {
          if (value.status == 'OK') {
            alert('Se guardó el perfil')
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

  selectFile(e) {
    console.log(e);
    if (e.target.files.length > 0) {
      this.fileName = e.target.files[0].name;
      this.fg.markAsTouched();
    }
  }

}
