import { Component, OnInit } from '@angular/core';
import { SobreNosotros } from 'src/app/Entities/sobreNosotros';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.scss']
})
export class SobreNosotrosComponent implements OnInit {

  image = 'assets/propias/3975316.jpg';

  sobreNosotros: SobreNosotros[] = [
    {
      nombre: 'COMUNIDAD',
      descripcion: 'Impulsamos la conexión entre quien quiere enseñar con quien quiere aprender. Compartir conocimiento.'
    },
    {
      nombre: 'DIGITAL',
      descripcion: 'Sin translados, sin visitas, sin esperas, todo 100% digital.'
    },
    {
      nombre: 'SEGURIDAD',
      descripcion: 'Aseguramos tu privacidad y te brindamos soporte de confianza.'
    },
  ]

  ngOnInit(): void {
  }

}
