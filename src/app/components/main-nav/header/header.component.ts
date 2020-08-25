import { Component, OnInit } from '@angular/core';
import { SeguridadService } from "../../../services/seguridad.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userId = 0;

  constructor(
    public as: SeguridadService,
  ) {
    if (this.as.getUser().id ) {
      this.userId = this.as.getUser().id;
    }

  }

  ngOnInit(): void {

  }

}
