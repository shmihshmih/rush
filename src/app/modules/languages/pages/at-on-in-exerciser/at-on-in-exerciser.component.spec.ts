import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtOnInExerciserComponent } from './at-on-in-exerciser.component';

describe('AtOnInExerciserComponent', () => {
  let component: AtOnInExerciserComponent;
  let fixture: ComponentFixture<AtOnInExerciserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtOnInExerciserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtOnInExerciserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
