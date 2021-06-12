import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcnCallBackComponent } from './upcn-call-back.component';

describe('UpcnCallBackComponent', () => {
  let component: UpcnCallBackComponent;
  let fixture: ComponentFixture<UpcnCallBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcnCallBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcnCallBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
