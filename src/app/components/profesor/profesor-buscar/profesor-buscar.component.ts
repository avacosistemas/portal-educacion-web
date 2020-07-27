import { Component, OnInit } from '@angular/core';
import { Profesor } from "../../../entities/profesor";
import {NivelEducativo} from "../../../entities/nivelEducativo";
import {NivelService} from "../../../services/nivel.service";
import {ProfesorService} from "../../../services/profesor.service";
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-profesor-buscar',
  templateUrl: './profesor-buscar.component.html',
  styleUrls: ['./profesor-buscar.component.scss']
})
export class ProfesorBuscarComponent implements OnInit {

  profesores: Profesor[];
  nivelesEducativos: NivelEducativo[];
  nivel = 'Educación Primaria - Primer Ciclo';
  materiaSeleccionada: string;

  constructor(
      protected ns: NivelService,
      protected ps: ProfesorService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  selecciono(valor: string) {
    this.materiaSeleccionada = valor;
  }

  loadData() {
    this.ns.getNiveles().subscribe(
        data => {
          this.nivelesEducativos = data;
        }
    );

    this.ps.getProfesores().subscribe(
        data => {
          this.profesores = data;
        }
    );
  }

  get getProfesores(): Profesor[] {
    return this.profesores.filter(f => f.materia === (this.materiaSeleccionada ? this.materiaSeleccionada : f.materia));
  }
}
