import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioWelcomeComponent } from './usuario-welcome.component';

describe('UsuarioWelcomeComponent', () => {
  let component: UsuarioWelcomeComponent;
  let fixture: ComponentFixture<UsuarioWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
