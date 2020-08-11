import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";

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
  ) {

    this.fg = fb.group({
      'usuario': new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  resolved(event) {
    console.log(event);
  }

  sendMail(f)
  {
    if (this.fg.invalid) return;
    this.router.navigate(['/login']);
  }

}
