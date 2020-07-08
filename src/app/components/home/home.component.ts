import {Component, ViewChild, OnInit} from '@angular/core';
import { Slide } from '../../entities/slide';
import {NivelService} from "../../services/nivel.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import '../../extensions'
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	materia: string;
	materias: string[] = [];

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
			top: '40%',
			left: ''
		},
		// {
		// 	image: '/assets/images/slider/3781245.jpg',
		// 	title: 'Buscás un profesor OnLine',
		// 	description: 'Te acercamos a tu profesor particular de una forma fácil, rápida y segura.',
		// 	buttonLink: 'Buscar',
		// 	top: '40%',
		// 	left: ''
		// },
		{
			image: '/assets/images/slider/photo-of-girl-watching-through-imac-4144222.jpg',
			title: 'Quiero aprender más',
			description: 'Ingresá a nuestra comunidad educativa para empezar a aprender sin límites.',
			buttonLink: 'Registrate',
			top: '40%',
			left: ''
		},
		{
			image: '/assets/images/slider/63293.jpg',
			title: 'Querés unirte a nuestro equipo',
			description: 'Una nueva forma de enseñar, te abrimos las puertas a nuestra red de alumnos.',
			buttonLink: 'Contactate',
			top: '40%',
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


	constructor(protected ns: NivelService)	{}

	ngOnInit(): void
	{
		this.loadData();
	}

	public loadData() {
		this.ns.getMaterias().subscribe(
			data => {
				this.materias = data;
			}
		)
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
