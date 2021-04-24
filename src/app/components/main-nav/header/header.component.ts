import { Component, OnInit } from '@angular/core';
import { SeguridadService } from "../../../services/seguridad.service";
import { HeaderService } from 'src/app/services/header.service';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public userId = 0;
  isAlumno: boolean;
  institucion: string;

  constructor(
    public as: SeguridadService,
    protected router: Router,
    protected als: AlumnoService,
    private headerService: HeaderService
  ) {
    if (this.as.getUser().id ) {
      this.userId = this.as.getUser().id;
      this.isAlumno = this.as.isAlumno();

      if (this.isAlumno) {
        this.als.getPerfil(this.userId).subscribe(
          (value: any) => {
            this.institucion = value.data.institucion;
          }
        );
      }
    }
  }

  menuSelected(menu: string) {
    this.headerService.setMenuSelected(menu);
    this.router.navigate([ '/usuario/' + this.userId]);
  }
}
