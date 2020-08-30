import { Component } from '@angular/core';
import { SeguridadService } from '../../../services/seguridad.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from "../../../services/header.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})

export class LoginComponent
{
  fg: FormGroup;
  hidePass = true;

  constructor(
    protected as: SeguridadService,
    protected router: Router,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  )
  {

    this.fg = fb.group({
      usuario: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      clave: new FormControl(null, [Validators.required, Validators.maxLength(40)])
    });

  }

  get usuario() { return this.fg.get('usuario'); }
  get clave() { return this.fg.get('clave'); }

  tryLogin(f)
  {
    if (this.fg.invalid){
      this.fg.markAllAsTouched();
      this.toastr.error('Por favor complete los datos requeridos.');
      return;
    }

    this.as.login(this.fg.value.usuario, this.fg.value.clave,
      (status) =>
      {
        if (status) {
          const userId = this.as.getUser().id;
          this.headerService.setMenuSelected('navclases');
          this.router.navigate([ '/usuario/' + userId]);
        } else {
          this.toastr.error('Usuario o contraseña invalido');
        }
      });
  }

}
