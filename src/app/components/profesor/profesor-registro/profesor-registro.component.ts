import { Component, OnInit } from '@angular/core';
import { FormsValidationService } from "../../../services/forms-validation.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { ProfesorService } from "../../../services/profesor.service";
import { Profesor } from "../../../entities/profesor";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from "../../../modules/fwk/core/service/toaster/toaster.service";
import { ToasterEnum } from "../../../modules/fwk/core/enum/toaster.enum";


@Component({
  selector: 'app-profesor-registro',
  templateUrl: './profesor-registro.component.html',
  styleUrls: ['./profesor-registro.component.scss']
})
export class ProfesorRegistroComponent implements OnInit {

  fg: FormGroup;
  rKey = environment.recaptchaKey;
  user: Profesor;

  constructor(
    private fb: FormBuilder,
    private fv: FormsValidationService,
    protected ps: ProfesorService,
    private spinner: NgxSpinnerService,
    private ts: ToasterService,
  ) { }

  ngOnInit(): void {

    this.fg = this.fb.group({
      nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellido: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      // email: [null, [Validators.required, Validators.email]],
      // email: [null, [Validators.required, this.fv.email('^\\s*?(.+)@(.+?)\\s*$')]],
      email: [null, [Validators.required, this.fv.correo()]],
      email2: [null, [Validators.required]],
      telCel: [null, [Validators.required, Validators.minLength(10), this.fv.telefono()]],
      telFijo: [null, [Validators.minLength(10), this.fv.telefono()]],
    });
  }


  // ===================== Getters =====================
  get nombre() { return this.fg.get('nombre'); }
  get apellido() { return this.fg.get('apellido'); }
  get email() { return this.fg.get('email'); }
  get email2() { return this.fg.get('email2'); }
  get telCel() { return this.fg.get('telCel'); }
  get telFijo() { return this.fg.get('telFijo'); }

  resolved(event) {
    console.log(event);
  }

  onSubmit() {

    if (this.fg.valid) {

      this.user = new Profesor();
      this.user.apellido = this.apellido.value;
      this.user.email = this.email.value;
      this.user.telefonoFijo = this.telFijo.value;
      this.user.telefonoMovil = this.telCel.value;

      this.spinner.show();
      this.ps.addProfesor(this.user).subscribe(
        (value:any) => {

          if (value.data.status == 'OK')
          {
            this.ts.show(ToasterEnum.success, 'Registro', 'se creo el registro correctamente');
          } else {
            this.ts.show(ToasterEnum.error, 'Registro', '');
          }
          console.log(value)
        },
        error => {
          console.error(error);
          this.ts.show(ToasterEnum.error, 'Registro', 'Se produjo un error intentado guardar el formulario');
        },
        () => {
          this.spinner.hide();
        }
      );
      console.log('form submitted');
    } else {
      // validate all form fields
      // this.validateAllFormFields(this.fg); //{7}
    }
  }


}
