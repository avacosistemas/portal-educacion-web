import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../entities/usuario';
import { AlumnoService } from '../../../services/alumno.service';
import { ProfesorService } from '../../../services/profesor.service';
import { ActivatedRoute } from '@angular/router';
import { SeguridadService } from '../../../services/seguridad.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsValidationService } from '../../../services/forms-validation.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent implements OnInit {

  usuario: Usuario = new Usuario();
  paramId: number;
  fileName = 'Seleccionar Archivo';
  active = 'navclases';
  isAlumno = false;
  cambiarPassword: boolean;
  idClase: number;
  imgSrc: string;

  constructor(
    private route: ActivatedRoute,
    private fv: FormsValidationService,
    protected as: SeguridadService,
    protected als: AlumnoService,
    protected rateConfig: NgbRatingConfig,
    protected ps: ProfesorService,
    private headerService: HeaderService
  ) {
    rateConfig.max = 5;

  }

  ngOnInit(): void {
    this.headerService.getMenuSelected().subscribe(ms => {
      this.active = ms;
    });
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.isAlumno = this.as.isAlumno();
    this.loadData();
  }

  setNav(nav: string) {
    this.active = nav;
  }

  selectFile(e) {
    if (e.target.files.length > 0) {
      this.fileName = e.target.files[0].name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.usuario.foto = e.target.result;
        this.imgSrc = this.usuario.foto;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  loadData() {
    if (this.isAlumno) {
      // load profesor
      this.ps.getPerfil(this.paramId).subscribe(
        (value: any) => {
          this.usuario = value.data;
          this.imgSrc = this.getImageSource();
        }
      );
    } else {
      // load alumno
      this.als.getPerfil(this.paramId).subscribe(
        (value: any) => {
          this.usuario = value.data;
          this.imgSrc = this.getImageSource();
        }
      );

    }
  }

  goDetalleClase(id) {
    this.active = 'navdetalleclase';
    this.idClase = id;
  }

  getImageSource() {
    if (this.usuario.nombreArchivo && this.usuario.foto) {
      return `data:image/${this.usuario.nombreArchivo.substring(this.usuario.nombreArchivo.lastIndexOf('.') + 1)};base64,${this.usuario.foto}`;
    }
  }
}
