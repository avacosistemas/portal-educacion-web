import { Component, OnInit } from '@angular/core';
import { FormsValidationService } from "../../../services/forms-validation.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../environments/environment";


@Component({
  selector: 'app-profesor-registro',
  templateUrl: './profesor-registro.component.html',
  styleUrls: ['./profesor-registro.component.scss']
})
export class ProfesorRegistroComponent implements OnInit {

  fg: FormGroup;
  rKey = environment.recaptchaKey;

  constructor(
    private fb: FormBuilder,
    private fv: FormsValidationService,

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
      console.log('form submitted');
    } else {
      // validate all form fields
      // this.validateAllFormFields(this.fg); //{7}
    }
  }


}
