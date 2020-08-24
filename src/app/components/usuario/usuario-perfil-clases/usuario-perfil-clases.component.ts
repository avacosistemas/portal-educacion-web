import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SeguridadService } from "../../../services/seguridad.service";
import { ActivatedRoute } from "@angular/router";
import { Clase } from "../../../entities/clase";
import { AlumnoService } from "../../../services/alumno.service";
import { ProfesorService } from "../../../services/profesor.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
declare var $;

@Component({
  selector: 'app-usuario-perfil-clases',
  templateUrl: './usuario-perfil-clases.component.html',
  styleUrls: ['./usuario-perfil-clases.component.scss']
})
export class UsuarioPerfilClasesComponent implements OnInit, AfterViewInit {

  paramId: number
  clases: Clase[] = [];
  isAlumno: boolean = false;

  constructor(
    private route: ActivatedRoute,
    protected as: SeguridadService,
    protected als: AlumnoService,
    protected ps: ProfesorService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void
  {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.isAlumno = this.as.isAlumno();
    this.loadData();
  }
  ngAfterViewInit() :void
  {
    $('#tableMisClases').fancyTable({
      pagination: true,
      perPage: 5
    });
  }

  loadData()
  {
    this._Mock();
    return;

    if (this.isAlumno)
    {
      // get Alumno
      this.als.getClases(this.paramId).subscribe(
        (value:any) => {
          this.clases = [];
          value.data.forEach( i =>
            {
              this.clases.push({
                id: i.id,
                calificacion: i.calificacion,
                idInstitucion: i.idInstitucion,
                nombreInstitucion: i.nombreInstitucion,
                materiaId: i.materiaId,
                materiaNombre: i.materiaNombre,
                dia: i.dia,
                hora: i.hora,
                estado: i.estado,

                profesorId: i.profesorId,
                profesorNombre: i.profesorNombre,
              });
            }
          );

        }
      );

    } else {
      // get profesor
      this.ps.getClases(this.paramId).subscribe(
        (value:any) => {
          this.clases = [];
          value.data.forEach( i =>
            {
              this.clases.push({
                id: i.id,
                calificacion: i.calificacion,
                idInstitucion: i.idInstitucion,
                nombreInstitucion: i.nombreInstitucion,
                materiaId: i.materiaId,
                materiaNombre: i.materiaNombre,
                dia: i.dia,
                hora: i.hora,
                estado: i.estado
              });
            }
          );
        }
      );
    }
  }


  _Mock() {

    this.clases.push({
      id: 1,
      calificacion: 3.5,
      idInstitucion: 1,
      nombreInstitucion: 'Teach',
      materiaId: 1,
      materiaNombre: 'Historia',
      dia: '22/08/2020',
      hora: '14:30',
      estado: 'OK',
      profesorNombre: 'Juan Camera',
      profesorId: 1,
    });
    this.clases.push({
      id: 2,
      calificacion: 2.7,
      idInstitucion: 1,
      nombreInstitucion: 'Teach',
      materiaId: 1,
      materiaNombre: 'Matemáticas',
      dia: '20/08/2020',
      hora: '11:45',
      estado: 'Pendiente',
      profesorNombre: 'Hector López',
      profesorId: 2,
    });

  }

}
