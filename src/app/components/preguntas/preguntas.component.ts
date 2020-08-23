import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // And a simple one
    for (let n = 0; n < 9; n++) {
      const row = $('<tr>');
      for (let nn = 0; nn < 5; nn++) {
        $('<td>', {
          html: this.rWord(8),
          style: 'padding:2px;'
        }).appendTo($(row));
      }
      row.appendTo($('#tablePreguntasProfesor'));
    }

    // Config de la grilla
    // https://www.npmjs.com/package/jquery.fancytable
    $('#tablePreguntasProfesor').fancyTable({
      pagination: true,
      perPage: 5
    });
  }

  // Mock de Datos
  rWord(r) {
    let t;
    let n = 'bcdfghjklmnpqrstvwxyz';
    let a = 'aeiou';
    const e = (r: any) => {
      return Math.floor(Math.random() * r);
    };
    let o = '';
    (r = parseInt(r, 10)), (n = n.split('')[0]), (a = a.split('')[0]);

    for (t = 0; t < r / 2; t++) {
      const l = n[e(n.length)];
      const p = a[e(a.length)];
      (o += 0 === t ? l.toUpperCase() : l), (o += 2 * t < r - 1 ? p : '');
    }

    return o;
  }

}
