import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCarpoolComponent } from './view-carpool.component';

describe('ViewCarpoolComponent', () => {
  let component: ViewCarpoolComponent;
  let fixture: ComponentFixture<ViewCarpoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCarpoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCarpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
