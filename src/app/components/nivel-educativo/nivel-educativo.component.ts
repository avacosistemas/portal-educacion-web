import { Component, OnInit } from '@angular/core';
import { NivelEducativo } from '../../entities/nivelEducativo';
import {NivelService} from '../../services/nivel.service';

@Component({
  selector: 'app-nivel-educativo',
  templateUrl: './nivel-educativo.component.html',
  styleUrls: ['./nivel-educativo.component.scss']
})
export class NivelEducativoComponent implements OnInit {

  nivelesEducativos: NivelEducativo[];

  constructor(
      protected ns: NivelService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.ns.getNiveles().subscribe(
        data => {
          this.nivelesEducativos = data;
        }
    )
  }

}
