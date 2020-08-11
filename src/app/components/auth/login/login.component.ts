import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

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
    protected as: AuthService,
    protected router: Router,
    private fb: FormBuilder,
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
    if (this.fg.invalid) return;

    let success = this.as.login(this.fg.value.usuario, this.fg.value.clave);

    this.router.navigate(['/']);

  }

}
