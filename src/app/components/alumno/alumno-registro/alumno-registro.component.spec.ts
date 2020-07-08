import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoRegistroComponent } from './alumno-registro.component';

describe('AlumnoRegistroComponent', () => {
  let component: AlumnoRegistroComponent;
  let fixture: ComponentFixture<AlumnoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
