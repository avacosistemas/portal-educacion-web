import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../services/seguridad.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})

export class LoginComponent implements OnInit
{
  fg: FormGroup;
  hidePass = true;

  constructor(
    protected as: SeguridadService,
    protected router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
  )
  {

    this.fg = fb.group({
      'usuario': new FormControl('',[Validators.required]),
      'clave': new FormControl('', [Validators.required,
        // Validators.minLength(6),
        Validators.maxLength(40)
      ])
    });

  }

  ngOnInit(): void
  {
  }

  tryLogin(f)
  {
    if (this.fg.invalid){
      this.toastr.error('Por favor complete los datos requeridos.');
      return;
    }

    this.as.login(this.fg.value.usuario, this.fg.value.clave,
      (status) =>
      {
        if (status) {
          const userId = this.as.getUser().id;
          this.router.navigate([ '/usuario/' + userId]);
        } else {
          this.toastr.error('Usuario o contraseña invalido');
        }
      });
  }

}
