import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesLayoutComponent } from './languages-layout.component';

describe('LanguagesLayoutComponent', () => {
  let component: LanguagesLayoutComponent;
  let fixture: ComponentFixture<LanguagesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagesLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
