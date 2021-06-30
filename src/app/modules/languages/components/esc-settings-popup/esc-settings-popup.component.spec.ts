import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscSettingsPopupComponent } from './esc-settings-popup.component';

describe('EscSettingsPopupComponent', () => {
  let component: EscSettingsPopupComponent;
  let fixture: ComponentFixture<EscSettingsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscSettingsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
