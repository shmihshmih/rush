import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from '../../../../core/services/blog/blog.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {loadQuestBooks} from '../../../../state/blog/blog.actions';
import {selectQuestBooksCatalog} from '../../../../state/blog/blog.selectors';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();
  private questBooksList$ = this.store.select(selectQuestBooksCatalog);
  public bookQuestList = [];

  constructor(private blogService: BlogService,
              private router: Router,
              private store: Store) {
    this.store.dispatch(loadQuestBooks());
  }

  ngOnInit(): void {
    this.questBooksList$.subscribe(questBooks => {
      this.bookQuestList = questBooks;
    });
  }

  openBookQuest(bookQuest: any): void {
    this.router.navigate(['/', 'blog', 'bookquest', bookQuest, '1']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
