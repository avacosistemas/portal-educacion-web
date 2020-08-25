import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SeguridadService } from "../../../services/seguridad.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-pwd-change',
  templateUrl: './pwd-change.component.html',
  styleUrls: ['./pwd-change.component.scss']
})
export class PwdChangeComponent implements OnInit {

  @Output() goBack = new EventEmitter();

  fg: FormGroup;

  constructor(
    private fb: FormBuilder,
    private as: SeguridadService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      pwdOld: [null, [Validators.required]],
      pwdNew: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      pwdNew2: [null, [Validators.required]],
    });
  }

  // ======================= Getters ==========================
  get pwdOld() { return this.fg.get('pwdOld'); }
  get pwdNew() { return this.fg.get('pwdNew'); }
  get pwdNew2() { return this.fg.get('pwdNew2'); }

  onSubmit() {

    if (this.fg.valid) {
      this.as.passwordUpdate(this.pwdOld.value, this.pwdNew.value).subscribe(
        value => {
          this.as.login(this.as.getUser().username, this.pwdNew.value,

            (status) =>
            {
              if (status) {
                const userId = this.as.getUser().id;
                this.toastr.success('Contraseña cambiada correctamente');
                this.router.navigate([ '/usuario/' + userId]);
              } else {
                this.as.logout();
              }
            }
          );

          this.router.navigate(['/']);

        },
        error => {
          let msg = 'No se pudo cambiar la contraseña';
          if (error?.error?.message)
            msg += '\n' + error.error.message;
          this.toastr.error(msg);
        }
      );

    } else {
      this.toastr.error('Por favor complete los datos requeridos.');
    }
  }
}
