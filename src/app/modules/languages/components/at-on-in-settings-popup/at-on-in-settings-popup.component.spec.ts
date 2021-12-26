import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtOnInSettingsPopupComponent } from './at-on-in-settings-popup.component';

describe('AtOnInSettingsPopupComponent', () => {
  let component: AtOnInSettingsPopupComponent;
  let fixture: ComponentFixture<AtOnInSettingsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtOnInSettingsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtOnInSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
