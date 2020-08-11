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
      data => {
        if (!data.picture) {
          data.picture = '/assets/icons/camara-fotografica.opt.svg';
        }
        this.profesor = data;
        this.nombre.setValue(data.nombre);
        this.apellido.setValue(data.apellido);
        this.institucion.setValue(data.institucion);
        this.usuario.setValue(data.usuario);
        this.dni.setValue(data.dni);
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
