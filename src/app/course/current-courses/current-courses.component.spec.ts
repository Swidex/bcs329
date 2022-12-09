import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCoursesComponent } from './current-courses.component';

describe('CurrentCoursesComponent', () => {
  let component: CurrentCoursesComponent;
  let fixture: ComponentFixture<CurrentCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
