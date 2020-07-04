import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(
      protected as: AuthService,
      protected router: Router,
  ) { }

  ngOnInit(): void {
    if(this.as.isLogged()) {
      this.as.logout();
      this.router.navigate(['/login']);
    }
  }



  tryLogin()
  {
    this.as.login();
    this.router.navigate(['/']);
  }
}
