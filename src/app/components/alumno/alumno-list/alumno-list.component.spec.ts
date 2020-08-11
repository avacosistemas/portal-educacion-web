import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoListComponent } from './alumno-list.component';

describe('AlumnoListComponent', () => {
  let component: AlumnoListComponent;
  let fixture: ComponentFixture<AlumnoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
