import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, AfterViewInit {

  _bShowNav = true;
  _bShowFooter = true;
  ingreso: boolean;

  constructor(
      protected as: AuthService,
      protected router: Router
  ) { }

  ngOnInit(): void
  {
    this.checkLogged();
  }

  ngAfterViewInit(): void
  {
    this.checkLogged();
  }


  checkLogged()
  {
    if (this.router.url.indexOf('/login') >= 0 || window.location.pathname.indexOf('/login') >= 0)
    {
      if (this.as.isLogged())
      {
        this._bShowFooter = true;
        this._bShowNav = true;
      } else {
        this._bShowFooter = false;
        this._bShowNav = false;
      }
    } else {
      this._bShowFooter = true;
      this._bShowNav = true;
    }

  }

  ingresar() {
    this.ingreso = true;
  }

  salir() {
    this.ingreso = false;
  }

}
