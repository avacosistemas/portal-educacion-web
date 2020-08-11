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
  ) { }


  ngOnInit(): void {
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
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.als.getAlumno(this.paramId).subscribe(
      data => {
        if (!data.picture) {
          data.picture = '/assets/icons/camara-fotografica.opt.svg';
        }
        this.alumno = data;
        this.nombre.setValue(data.nombre);
        this.apellido.setValue(data.apellido);
        this.dni.setValue(data.dni);
        this.usuario.setValue(data.usuario);
        this.institucion.setValue(data.institucion);
        this.email.setValue(data.email);
        this.telCel.setValue(data.telefonoMovil);
        this.telFijo.setValue(data.telefonoFijo);
      }
    );
  }

  onSubmit() {
    if (this.fg.valid) {
      console.log('form submitted');
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
