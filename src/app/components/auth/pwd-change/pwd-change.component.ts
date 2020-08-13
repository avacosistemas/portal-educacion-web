import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-pwd-change',
  templateUrl: './pwd-change.component.html',
  styleUrls: ['./pwd-change.component.scss']
})
export class PwdChangeComponent implements OnInit {

  fg: FormGroup;

  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      pwdOld: [null,[Validators.required]],
      pwdNew: [null,[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      pwdNew2: [null,[Validators.required]],
    });
  }

  // ======================= Getters ==========================
  get pwdOld() { return this.fg.get('pwdOld'); }
  get pwdNew() { return this.fg.get('pwdNew'); }
  get pwdNew2() { return this.fg.get('pwdNew2'); }

  onSubmit() {
    if (this.fg.valid) {
      console.log('form submitted');
    } else {
      console.error('El formulario contiene errores');
    }
  }
}
