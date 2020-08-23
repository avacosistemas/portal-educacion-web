import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormsValidationService } from "../../../services/forms-validation.service";
import { ActivatedRoute } from "@angular/router";
import { Profesor } from "../../../entities/profesor";
import { ProfesorService } from "../../../services/profesor.service";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-profesor-perfil',
  templateUrl: './profesor-perfil.component.html',
  styleUrls: ['./profesor-perfil.component.scss']
})
export class ProfesorPerfilComponent implements OnInit {

  fg: FormGroup;
  profesor: Profesor;
  paramId: number;

  fileName = 'Seleccionar Archivo';

  constructor(
    private fb: FormBuilder,
    private fv: FormsValidationService,
    private route: ActivatedRoute,
    protected rateConfig: NgbRatingConfig,
    private ps: ProfesorService,
  ) {
    rateConfig.max = 5;
    this.profesor = new Profesor();


  }


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
    this.ps.getProfesor(this.paramId).subscribe(
      (value:any) => {
        if (!value.data.foto) {
          value.data.foto = '/assets/icons/fa/fas-fa-user-circle-mod.svg';
        }
        this.profesor = value.data;
        this.nombre.setValue(value.data.nombre);
        this.apellido.setValue(value.data.apellido);
        this.institucion.setValue(value.data.institucion);
        this.usuario.setValue(value.data.username);
        this.dni.setValue(value.data.numeroIdentificacion);
        this.email.setValue(value.data.email);
        this.telCel.setValue(value.data.telefonoMovil);
        this.telFijo.setValue(value.data.telefonoFijo);
      }
    );
  }

  onSubmit() {
    if (this.fg.valid) {

      this.profesor.nombre = this.nombre.value;
      this.profesor.apellido = this.apellido.value;
      this.profesor.institucion = this.institucion.value;
      this.profesor.username = this.usuario.value;
      this.profesor.dni = this.dni.value;
      this.profesor.email = this.email.value;
      this.profesor.telefonoMovil = this.telCel.value;
      this.profesor.telefonoFijo = this.telFijo.value;

      this.ps.setProfesor(this.profesor).subscribe(
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

  selectFile(e) {
    console.log(e);
    if (e.target.files.length > 0) {
      this.fileName = e.target.files[0].name;
      this.fg.markAsTouched();
    }
  }


}
