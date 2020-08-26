import { Component, OnInit } from '@angular/core';
import { SeguridadService } from "../../../services/seguridad.service";
import { HeaderService } from 'src/app/services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public userId = 0;

  constructor(
    public as: SeguridadService,
    protected router: Router,
    private headerService: HeaderService
  ) {
    if (this.as.getUser().id ) {
      this.userId = this.as.getUser().id;
    }

  }

  menuSelected(menu: string) {
    this.headerService.setMenuSelected(menu);
    this.router.navigate([ '/usuario/' + this.userId]);
  }
}
