import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  ingreso: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  ingresar() {
    this.ingreso = true;
  }

  salir() {
    this.ingreso = false;
  }

}
