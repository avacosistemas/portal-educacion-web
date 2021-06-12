import {Component, OnInit} from '@angular/core';
import {SeguridadService} from "../../services/seguridad.service";
import {Router, NavigationEnd} from '@angular/router';


@Component({
	selector: 'app-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit
{

	_bShowNav = true;
	_bShowFooter = true;
	// ingreso: boolean;
	_isLogged = false;

	constructor(
		public as: SeguridadService,
		protected router: Router
	)
	{

		this.router.events.subscribe(event =>
		{
			if (event instanceof NavigationEnd)
				this.checkRoute();
		});

	}

	ngOnInit(): void
	{
		this.checkRoute();
	}

	checkRoute()
	{
		if ( (this.router.url.indexOf('/profesor') >= 0 && this.router.url.indexOf('/profesor/registro') < 0 )
			|| ( window.location.pathname.indexOf('/profesor') >= 0 && window.location.pathname.indexOf('/profesor/registro') <0 )
			|| ( window.location.pathname.indexOf('/alumno') >= 0 && window.location.pathname.indexOf('/alumno/registro') <0 )
			|| this.router.url.indexOf('/clase') >= 0
			|| window.location.pathname.indexOf('/clase') >= 0
			|| this.router.url.indexOf('/buscar') >= 0
			|| window.location.pathname.indexOf('/buscar') >= 0
			|| this.router.url.indexOf('/preguntas') >= 0
			|| window.location.pathname.indexOf('/preguntas') >= 0
			|| this.router.url.indexOf('/usuario') >= 0
			|| window.location.pathname.indexOf('/usuario') >= 0)
		{
        document.body.classList.add('back-pattern-001');
		}
		else
		{
			document.body.classList.remove('back-pattern-001')
		}

		if (this.router.url.indexOf('/login') >= 0
      || window.location.pathname.indexOf('/login') >= 0
      || (this.router.url.indexOf('/pwdreset') >= 0
      || window.location.pathname.indexOf('/pwdreset') >= 0)
	  || (this.router.url.indexOf('/upcn') >= 0
      || window.location.pathname.indexOf('/upcn') >= 0 )
	  || (this.router.url.indexOf('/upcnCallBack') >= 0
      || window.location.pathname.indexOf('/upcnCallBack') >= 0))
		{
			if (this.as.isLogged())
				this.as.logout();

			this._bShowFooter = false;
			this._bShowNav = false;
		}
		else
		{
			this._bShowFooter = true;
			this._bShowNav = true;
		}

	}

}
