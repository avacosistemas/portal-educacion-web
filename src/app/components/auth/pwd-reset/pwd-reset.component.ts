import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import {SeguridadService} from '../../../services/seguridad.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-pwd-reset',
  templateUrl: './pwd-reset.component.html',
  styleUrls: ['./pwd-reset.component.scss']
})
export class PwdResetComponent implements OnInit {

  fg: FormGroup;
  rKey = environment.recaptchaKey;

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    protected as: SeguridadService,
    private toastr: ToastrService,
  )
  {
    this.fg = fb.group({
      usuario: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  // ======================= Getters ==========================
  get usuario() { return this.fg.get('usuario'); }

  resolved(event) {
    console.log(event);
  }

  sendMail(f)
  {
    if (this.fg.invalid) {
      this.toastr.error('Por favor complete los datos requeridos.');
      return;
    }

    this.as.passwordReset(this.usuario.value).subscribe(
      (data: any) => {
        if (data && data.status === 'OK') {
          this.toastr.success('Se ha enviado un email con los pasos para recuperar su contraseña.');
          this.router.navigate(['/login']);
        }
      },
      error => {
        this.toastr.error('Usuario no encontrado');
        console.error(error);
      });

  }

}
