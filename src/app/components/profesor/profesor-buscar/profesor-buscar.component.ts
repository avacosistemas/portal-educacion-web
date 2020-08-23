import { Component, OnInit } from '@angular/core';
import { Profesor } from "../../../entities/profesor";
import {NivelEducativo} from "../../../entities/nivelEducativo";
import {NivelService} from "../../../services/nivel.service";
import {ProfesorService} from "../../../services/profesor.service";
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { MateriaService } from "../../../services/materia.service";
import { Materia } from "../../../entities/materia";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profesor-buscar',
  templateUrl: './profesor-buscar.component.html',
  styleUrls: ['./profesor-buscar.component.scss']
})
export class ProfesorBuscarComponent implements OnInit {

  profesores: Profesor[] = [];
  nivelesEducativos: NivelEducativo[];
  nivel = 'Educación Primaria - Primer Ciclo';
  materiaSeleccionada: string;
  selMatId: number = 0;
  selLevId: number = 0;
  materias: Materia[] = [];
  idParam: number;

  constructor(
      protected ns: NivelService,
      protected ms: MateriaService,
      protected ps: ProfesorService,
      private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idParam = Number(this.route.snapshot.paramMap.get('id'));
    this.selMatId = this.idParam || 0;
    this.loadData();

  }

  selecciono(valor: string) {
    this.materiaSeleccionada = valor;
  }

  loadData() {

    this.ps.getProfesores().subscribe(
      (value:any) => {

        this.profesores = value.data;
        this.profesores.forEach(p => {
          if (!p.foto) {
            p.foto = '/assets/icons/fa/fas-fa-user-circle-mod.svg';
          }
        })

      }
    );

    this.ms.getMaterias().subscribe(
      (value: any) =>
      {
        value.data.forEach(materia =>
        {

          if (this.selMatId)
          {
            if (materia.id == this.selMatId)
            {
              this.selLevId = materia.idNivel;
            }
          }

          this.selLevId = this.selLevId || 1;

          this.materias.push(
            {
              id: materia.id,
              descripcion: materia.descripcion,
              idNivel: materia.idNivel,
              nombre: materia.descripcion
            }
          );


        });

        this.ns.getNiveles().subscribe(
          (data: any) =>
          {
            this.nivelesEducativos = data.data;
          }
        );

      } // end next

    ); // end susbscribe


  }

  get getProfesores(): Profesor[] {
    return this.profesores.filter(f => f.materia === (this.materiaSeleccionada ? this.materiaSeleccionada : f.materia));
  }
}
