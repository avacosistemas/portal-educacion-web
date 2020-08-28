import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseAlumnosComponent } from './clase-alumnos.component';

describe('ClaseAlumnosComponent', () => {
  let component: ClaseAlumnosComponent;
  let fixture: ComponentFixture<ClaseAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaseAlumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
