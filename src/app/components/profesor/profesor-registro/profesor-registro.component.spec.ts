import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorRegistroComponent } from './profesor-registro.component';

describe('ProfesorRegistroComponent', () => {
  let component: ProfesorRegistroComponent;
  let fixture: ComponentFixture<ProfesorRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesorRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
