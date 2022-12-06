import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuttleComponent } from './shuttle.component';

describe('ShuttleComponent', () => {
  let component: ShuttleComponent;
  let fixture: ComponentFixture<ShuttleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShuttleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShuttleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
