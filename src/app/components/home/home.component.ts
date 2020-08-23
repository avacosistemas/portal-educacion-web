import {Component, ViewChild, OnInit} from '@angular/core';
import { Slide } from '../../entities/slide';
import {NivelService} from "../../services/nivel.service";
import { Observable, of } from "rxjs";
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import '../../extensions'
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { MateriaService } from "../../services/materia.service";
import { Materia } from "../../entities/materia";
import { Router } from "@angular/router";


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	materia: string;
	materias: string[] = [];
	matModels: Materia[] = [];

	// ================ Carousel variables ================
	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = true;
	pauseOnHover = true;

	// slides: Slide[] = [];
	slides: Slide[] = [
		{
			image: '/assets/images/slider/O6V1FT0.jpg',
			title: 'Teach.com.ar',
			description: 'Te acercamos herramientas que cambian la forma en la que estudiás',
			top: '33%',
			left: ''
		},
		// {
		// 	image: '/assets/images/slider/3781245.jpg',
		// 	title: 'Buscás un profesor OnLine',
		// 	description: 'Te acercamos a tu profesor particular de una forma fácil, rápida y segura.',
		// 	buttonLink: 'Buscar',
		// 	top: '33%',
		// 	left: ''
		// },
		{
			image: '/assets/images/slider/photo-of-girl-watching-through-imac-4144222.jpg',
			title: 'Quiero aprender más',
			description: 'Ingresá a nuestra comunidad educativa para empezar a aprender sin límites.',
			buttonLink: 'Registrate',
			top: '33%',
			left: ''
		},
		{
			image: '/assets/images/slider/3781245.jpg',
			// image: '/assets/images/slider/63293.jpg',
			title: 'Querés unirte a nuestro equipo',
			description: 'Una nueva forma de enseñar, te abrimos las puertas a nuestra red de alumnos.',
			buttonLink: 'Contactate',
			top: '33%',
			left: ''
		},
	];

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.materias.filter(v =>
          v.toLowerCase().removeAccents().indexOf(term.toLowerCase().removeAccents()) > -1
        ).slice(0, 10))
    );


  constructor(
    protected ms: MateriaService,
    protected ns: NivelService,
    protected router: Router,
  )	{}

	ngOnInit(): void
	{
		this.loadData();
	}

	public loadData() {

    this.ms.getMaterias().subscribe(
      (data:any) => {

        this.matModels = [];
        this.materias = [];

        data.data.forEach(m =>
        {
          if (!(this.materias.indexOf(m.descripcion) >= 0))
          {
            this.materias.push(m.descripcion)
          }
          this.matModels.push({
            nombre: m.descripcion,
            id: m.id,
            idNivel: m.idNivel,
            descripcion: m.descripcion
          })
        });

      },
      error => {
			  console.error(error);
      }
		)
	}

  buscarMateria($event) {
    $event.preventDefault();
    this.matModels.forEach(m => {
      if (m.nombre == this.materia ) {
        this.router.navigate(['/buscar/' + m.id])
      }
    });
  }

	// onSlide(slideEvent: NgbSlideEvent) {
	// 	if (this.unpauseOnArrow && slideEvent.paused &&
	// 		(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
	// 		this.togglePaused();
	// 	}
	// 	if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
	// 		this.togglePaused();
	// 	}
	// }

}
