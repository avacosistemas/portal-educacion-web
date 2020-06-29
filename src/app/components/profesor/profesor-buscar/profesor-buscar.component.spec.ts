import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorBuscarComponent } from './profesor-buscar.component';

describe('ProfesorBuscarComponent', () => {
  let component: ProfesorBuscarComponent;
  let fixture: ComponentFixture<ProfesorBuscarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesorBuscarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
