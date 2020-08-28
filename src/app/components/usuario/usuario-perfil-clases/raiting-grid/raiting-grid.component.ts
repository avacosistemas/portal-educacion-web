import { Component, Input } from '@angular/core';
import { Calificaciones } from 'src/app/entities/calificaciones';

@Component({
  selector: 'app-raiting-grid',
  templateUrl: './raiting-grid.component.html',
  styleUrls: ['./raiting-grid.component.scss']
})
export class RaitingGridComponent {

  @Input() value; // data from table
  @Input() rowData: Calificaciones;
}
