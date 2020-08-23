import { Component, OnInit } from '@angular/core';
import { SeguridadService } from "../../../services/seguridad.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public as: SeguridadService,
  ) { }

  ngOnInit(): void {
  }

}
