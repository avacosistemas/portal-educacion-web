import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../entities/profesor';
import {NivelEducativo} from '../../../entities/nivelEducativo';
import {NivelService} from '../../../services/nivel.service';
import {ProfesorService} from '../../../services/profesor.service';
import { MateriaService } from '../../../services/materia.service';
import { Materia } from '../../../entities/materia';
import { ActivatedRoute } from '@angular/router';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { CatalogoProfesor } from 'src/app/entities/catalogoProfesor';
import { valueReferenceToExpression } from "@angular/compiler-cli/src/ngtsc/annotations/src/util";

@Component({
  selector: 'app-profesor-buscar',
  templateUrl: './profesor-buscar.component.html',
  styleUrls: ['./profesor-buscar.component.scss']
})
export class ProfesorBuscarComponent implements OnInit {

  profesores: CatalogoProfesor[] = [];
  nivelesEducativos: NivelEducativo[] = [];
  materiaSeleccionada: string;
  selMatId: number;
  selLevId = 1;
  orderId = 'RELEVANTE';
  materias: Materia[] = [];
  idParam: number;
  nivelParam: number;
  nivelSeleccionado: string;

  constructor(
      protected ns: NivelService,
      protected ms: MateriaService,
      protected ps: ProfesorService,
      private route: ActivatedRoute,
      private catalogoService: CatalogoService,
  ) { }

  ngOnInit(): void {
    this.idParam = Number(this.route.snapshot.paramMap.get('id'));
    this.nivelParam = Number(this.route.snapshot.paramMap.get('nivel'));
    this.selLevId = this.nivelParam || 1;
    this.selMatId = this.idParam || null;
    this.loadData();
  }

  selecciono(valor: number) {
    if ( valor > 0) {
      this.materiaSeleccionada = this.materias.find(f => f.id === valor).descripcion;
    }
    this.selMatId = valor == 0 ? null : valor;
    this.consultarCatalogo();
  }

  onChangeOrdenar() {
    this.consultarCatalogo();
  }

  loadData() {
    this.ns.getNiveles().subscribe((n: any) => {
      this.nivelesEducativos = n.data;
      this.nivelSeleccionado = this.nivelesEducativos.find(f => f.id === this.selLevId).descripcion;

      this.getMateriasPorNiveles();
    });
  }

  getMateriasPorNiveles() {
    this.ms.getMateriasPorNiveles(this.selLevId).subscribe(
      (value: any) =>
      {
        this.materias = [];
        value.data.forEach(materia =>
        {

          this.materias.push(
            {
              id: materia.id,
              descripcion: materia.descripcion,
              idNivel: materia.idNivel,
              nombre: materia.descripcion,
              selected: (materia.id === this.selMatId)
            }
          );
        });

        this.consultarCatalogo();
      } // end next
    ); // end susbscribe
  }

  consultarCatalogo() {
    this.catalogoService.getCatalogoDocente({orden: this.orderId, idMateria: this.selMatId, idNivel: this.selLevId})
    .subscribe(d => {
      console.log(d);
      this.profesores = d;
      this.profesores.forEach(p => {
        if (!p.foto) {
          p.foto = '/assets/icons/fa/fas-fa-user-circle-mod.svg';
        }
      });
    });
  }

  get getProfesores(): CatalogoProfesor[] {
    return this.profesores;
  }

  onChangeNivel() {
    this.nivelSeleccionado = this.nivelesEducativos.find(f => f.id === this.selLevId).descripcion;
    this.getMateriasPorNiveles();
  }
}
