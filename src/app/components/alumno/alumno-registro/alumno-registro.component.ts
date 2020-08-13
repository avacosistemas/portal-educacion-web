import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsValidationService } from "../../../services/forms-validation.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from "../../../../environments/environment";
import { AlumnoService } from "../../../services/alumno.service";
import { Alumno } from "../../../entities/alumno";

@Component({
  selector: 'app-alumno-registro',
  templateUrl: './alumno-registro.component.html',
  styleUrls: ['./alumno-registro.component.scss']
})
export class AlumnoRegistroComponent implements OnInit {

  fg: FormGroup;
  rKey = environment.recaptchaKey;

  constructor(
    private fb: FormBuilder,
    private fv: FormsValidationService,
    private als: AlumnoService,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.fg = this.fb.group({
      nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellido: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      dni: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      usuario: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(40), this.fv.usuario()]],
      pwd: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      pwd2: [null, [Validators.required]],
      email: [null, [Validators.required, this.fv.correo()]],
      email2: [null, [Validators.required]],
      telCel: [null, [Validators.required, Validators.minLength(10), this.fv.telefono()]],
      telFijo: [null, [Validators.minLength(10), this.fv.telefono()]],
      terminos: [null, [Validators.required, this.fv.condiciones()]],
      mensaje: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]]
    });
  }

  // ======================= Getters ==========================
  get nombre() { return this.fg.get('nombre'); }
  get apellido() { return this.fg.get('apellido'); }
  get dni() { return this.fg.get('dni'); }
  get usuario() { return this.fg.get('usuario'); }
  get pwd() { return this.fg.get('pwd'); }
  get pwd2() { return this.fg.get('pwd2'); }
  get email() { return this.fg.get('email'); }
  get email2() { return this.fg.get('email2'); }
  get telCel() { return this.fg.get('telCel'); }
  get telFijo() { return this.fg.get('telFijo'); }
  get terminos() { return this.fg.get('terminos'); }
  get mensaje() { return this.fg.get('mensaje'); }

  openXl(content) {
    this.modalService.open(content, { size: 'xl', scrollable: true, centered: true });
  }

  resolved(event) {
    console.log(event);
  }

  onSubmit() {
    if (this.fg.valid) {
      console.log('The form is valid');

      const alumno: Alumno = new Alumno();
      alumno.apellido = this.apellido.value;
      alumno.dni = this.dni.value;
      alumno.email = this.email.value;
      // alumno.id = this.;
      alumno.institucion = 'Teach';
      alumno.nombre = this.nombre.value;
      alumno.password = this.pwd.value;
      // alumno.secondPassword = this.pwd.value;
      alumno.picture = '';
      alumno.telefonoFijo = this.telFijo.value;
      alumno.telefonoMovil = this.telCel.value;
      alumno.usuario = this.usuario.value;

      this.als.setAlumnoNuevo(alumno).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('The form is INVALID')
    }
  }

}
