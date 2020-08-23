import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPerfilClasesComponent } from './usuario-perfil-clases.component';

describe('UsuarioPerfilClasesComponent', () => {
  let component: UsuarioPerfilClasesComponent;
  let fixture: ComponentFixture<UsuarioPerfilClasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPerfilClasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPerfilClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
