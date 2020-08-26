import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-raiting-grid',
  templateUrl: './raiting-grid.component.html',
  styleUrls: ['./raiting-grid.component.scss']
})
export class RaitingGridComponent {

  @Input() value; // data from table
  @Input() rowData;

}
