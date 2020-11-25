import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCardSettingsComponent } from './word-card-settings.component';

describe('WordCardSettingsComponent', () => {
  let component: WordCardSettingsComponent;
  let fixture: ComponentFixture<WordCardSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordCardSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCardSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
