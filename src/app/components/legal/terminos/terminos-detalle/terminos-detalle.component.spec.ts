import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminosDetalleComponent } from './terminos-detalle.component';

describe('TerminosDetalleComponent', () => {
  let component: TerminosDetalleComponent;
  let fixture: ComponentFixture<TerminosDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminosDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
