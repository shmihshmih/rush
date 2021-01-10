import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishSentencesCreatorComponent } from './english-sentences-creator.component';

describe('EnglishSentencesCreatorComponent', () => {
  let component: EnglishSentencesCreatorComponent;
  let fixture: ComponentFixture<EnglishSentencesCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnglishSentencesCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnglishSentencesCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
