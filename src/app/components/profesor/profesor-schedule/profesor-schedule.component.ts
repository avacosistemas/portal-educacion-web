import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/entities/profesor';
import { ProfesorService } from "../../../services/profesor.service";
import { ActivatedRoute } from "@angular/router";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AlumnoService } from "../../../services/alumno.service";
import { SeguridadService } from "../../../services/seguridad.service";
import { Mensaje } from "../../../entities/mensaje";

@Component({
  selector: 'app-profesor-schedule',
  templateUrl: './profesor-schedule.component.html',
  styleUrls: [ './profesor-schedule.component.scss' ]
})
export class ProfesorScheduleComponent implements OnInit {

  profesor: Profesor;
  profesorIdParam: number;

  horarios: string[] = [];

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(
    protected ps: ProfesorService,
    protected als: AlumnoService,
    private route: ActivatedRoute,
    protected rateConfig: NgbRatingConfig,
    protected calendar: NgbCalendar,
    protected as: SeguridadService
  )
  {
    this.profesor = new Profesor();
    rateConfig.max = 5;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.profesorIdParam = Number(this.route.snapshot.paramMap.get('id'));
    this.ps.getProfesor(this.profesorIdParam).subscribe(
      (value: any) => {

        if (value.data?.foto == null) {
          value.data.foto = '/assets/icons/fa/fas-fa-user-circle-mod.svg';
        }

        this.profesor = value.data;
      }
    );
  }

  enviarConsulta(event) {
    event.preventDefault();
    let msg: Mensaje = {
      fromId: this.as.getUser().id,
      toId: this.profesorIdParam,
      message: ''
    };

    // TODO hacer el servicio
    this.als.sendMessage(msg);

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

    this.ps.getHorarios(this.fromDate, this.profesorIdParam).subscribe(
      data => {
        this.horarios = data;
      }
    )

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
