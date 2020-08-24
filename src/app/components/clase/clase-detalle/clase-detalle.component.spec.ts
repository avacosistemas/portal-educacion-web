import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseDetalleComponent } from './clase-detalle.component';

describe('ClaseDetalleComponent', () => {
  let component: ClaseDetalleComponent;
  let fixture: ComponentFixture<ClaseDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaseDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
