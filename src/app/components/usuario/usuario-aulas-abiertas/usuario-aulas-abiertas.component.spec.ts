import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAulasAbiertasComponent } from './usuario-aulas-abiertas.component';

describe('UsuarioAulasAbiertasComponent', () => {
  let component: UsuarioAulasAbiertasComponent;
  let fixture: ComponentFixture<UsuarioAulasAbiertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioAulasAbiertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAulasAbiertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
