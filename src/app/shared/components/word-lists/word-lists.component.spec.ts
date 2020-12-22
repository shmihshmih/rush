import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListsComponent } from './word-lists.component';

describe('WordListsComponent', () => {
  let component: WordListsComponent;
  let fixture: ComponentFixture<WordListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
