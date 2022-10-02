import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoHrLayoutComponent } from './auto-hr-layout.component';

describe('AutoHrLayoutComponent', () => {
  let component: AutoHrLayoutComponent;
  let fixture: ComponentFixture<AutoHrLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoHrLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoHrLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
