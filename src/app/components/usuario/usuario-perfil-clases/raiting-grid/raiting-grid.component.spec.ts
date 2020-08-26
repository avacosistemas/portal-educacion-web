import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaitingGridComponent } from './raiting-grid.component';

describe('RaitingGridComponent', () => {
  let component: RaitingGridComponent;
  let fixture: ComponentFixture<RaitingGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaitingGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaitingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
