import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorScheduleComponent } from './profesor-schedule.component';

describe('ProfesorPerfilComponent', () => {
  let component: ProfesorScheduleComponent;
  let fixture: ComponentFixture<ProfesorScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesorScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
