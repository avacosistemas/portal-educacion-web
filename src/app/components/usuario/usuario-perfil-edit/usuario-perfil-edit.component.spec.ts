import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPerfilEditComponent } from './usuario-perfil-edit.component';

describe('UsuarioPerfilEditComponent', () => {
  let component: UsuarioPerfilEditComponent;
  let fixture: ComponentFixture<UsuarioPerfilEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPerfilEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPerfilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
