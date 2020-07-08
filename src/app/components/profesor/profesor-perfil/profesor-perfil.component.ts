import {Component, OnInit} from '@angular/core';
import {Profesor} from 'src/app/entities/profesor';
import {ProfesorService} from "../../../services/profesor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-profesor-perfil',
	templateUrl: './profesor-perfil.component.html',
	styleUrls: ['./profesor-perfil.component.scss']
})
export class ProfesorPerfilComponent implements OnInit
{

	profesor: Profesor;
	profesorIdParam: number;

	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate;
	toDate: NgbDate | null = null;

	constructor(
		protected ps: ProfesorService,
		private route: ActivatedRoute,
		private router: Router,
		protected rateConfig: NgbRatingConfig,
        protected calendar: NgbCalendar
	)
	{
		rateConfig.max = 5;
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

	}

	ngOnInit(): void
	{
		this.loadData();
	}

	loadData()
	{
		this.profesorIdParam = Number(this.route.snapshot.paramMap.get('id'));
		this.ps.getProfesor(this.profesorIdParam).subscribe(
			data =>
			{
				this.profesor = data;
			}
		);
	}


    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
    }
}
