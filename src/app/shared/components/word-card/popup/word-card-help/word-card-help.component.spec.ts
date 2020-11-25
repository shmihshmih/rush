import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCardHelpComponent } from './word-card-help.component';

describe('WordCardHelpComponent', () => {
  let component: WordCardHelpComponent;
  let fixture: ComponentFixture<WordCardHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordCardHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCardHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
