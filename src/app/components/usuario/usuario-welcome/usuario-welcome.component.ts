import { Component, OnInit } from '@angular/core';
import { SeguridadService } from "../../../services/seguridad.service";
import { ActivatedRoute } from "@angular/router";
import { AlumnoService } from "../../../services/alumno.service";
import { ProfesorService } from "../../../services/profesor.service";
import { Usuario } from "../../../entities/usuario";

@Component({
  selector: 'app-usuario-welcome',
  templateUrl: './usuario-welcome.component.html',
  styleUrls: ['./usuario-welcome.component.scss']
})
export class UsuarioWelcomeComponent implements OnInit {

  paramId: number;
  usuario: Usuario = new Usuario();

  constructor(
    private route: ActivatedRoute,
    protected as: SeguridadService,
    protected als: AlumnoService,
    protected ps: ProfesorService,
  ) {}

  ngOnInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData() {
    if (this.as.isAlumno()) {
      this.als.getAlumno(this.paramId).subscribe(
        (value:any) => {
          this.usuario.apellido = value.data.apellido;
          this.usuario.nombre = value.data.nombre;
          this.usuario.nombreApellido = value.data.nombreApellido;
          this.usuario.username = value.data.username;
          this.usuario.telefonoFijo = value.data.telefonoFijo;
          this.usuario.telefonoMovil = value.data.telefonoMovil;
          this.usuario.tipoIdentificacion = value.data.tipoIdentificacion;
          this.usuario.numeroIdentificacion = value.data.numeroIdentificacion;
          this.usuario.foto = value.data.foto;
          this.usuario.institucion = value.data.institucion;
        }
      );
    } else {
      this.ps.getProfesor(this.paramId).subscribe(
        (value:any) => {
          this.usuario.apellido = value.data.apellido;
          this.usuario.nombre = value.data.nombre;
          this.usuario.nombreApellido = value.data.nombreApellido;
          this.usuario.username = value.data.username;
          this.usuario.telefonoFijo = value.data.telefonoFijo;
          this.usuario.telefonoMovil = value.data.telefonoMovil;
          this.usuario.tipoIdentificacion = value.data.tipoIdentificacion;
          this.usuario.numeroIdentificacion = value.data.numeroIdentificacion;
          this.usuario.foto = value.data.foto;
          this.usuario.institucion = value.data.institucion;
          // Propios del profesor
          this.usuario.calificacion = value.data.calificacion;
          this.usuario.descripcion = value.data.descripcion;
        }
      );
    }



  }

}
