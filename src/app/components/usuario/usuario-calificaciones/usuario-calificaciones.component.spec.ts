import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCalificacionesComponent } from './usuario-calificaciones.component';

describe('UsuarioCalificacionesComponent', () => {
  let component: UsuarioCalificacionesComponent;
  let fixture: ComponentFixture<UsuarioCalificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioCalificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
