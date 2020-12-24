import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookQuestComponent } from './book-quest.component';

describe('BookQuestComponent', () => {
  let component: BookQuestComponent;
  let fixture: ComponentFixture<BookQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
