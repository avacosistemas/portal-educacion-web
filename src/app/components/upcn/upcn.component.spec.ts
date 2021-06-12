import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcnComponent } from './upcn.component';

describe('UpcnComponent', () => {
  let component: UpcnComponent;
  let fixture: ComponentFixture<UpcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
