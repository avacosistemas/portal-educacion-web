import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
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
		public as: AuthService,
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
		if (this.router.url.indexOf('/profesor') >= 0
			|| window.location.pathname.indexOf('/profesor') >= 0
			||this.router.url.indexOf('/buscar') >= 0
			|| window.location.pathname.indexOf('/buscar') >= 0)
		{
			document.body.classList.add('back-pattern-001');
		}
		else
		{
			document.body.classList.remove('back-pattern-001')
		}

		if (this.router.url.indexOf('/login') >= 0 || window.location.pathname.indexOf('/login') >= 0)
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
