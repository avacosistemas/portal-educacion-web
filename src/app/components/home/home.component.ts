import { Component } from '@angular/core';
import { Slide } from '../../Entities/slide';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	slides: Slide[] = [
		{
			image: '/assets/images/slider/O6V1FT0.jpg',
			title: 'Teach.com.ar',
			description: 'Te acercamos herramientas que cambian la forma en la que estudiás',
			top: '40%',
			left: ''
		},
		{
			image: '/assets/images/slider/3781245.jpg',
			title: 'Buscás un profesor OnLine',
			description: 'Te acercamos a tu profesor particular de una forma fácil, rápida y segura.',
			buttonLink: 'Buscar',
			top: '40%',
			left: ''
		},
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
}
