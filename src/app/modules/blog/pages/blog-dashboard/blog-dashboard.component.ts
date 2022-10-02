import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {selectQuestBooksCatalog} from '../../../../state/blog/blog.selectors';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.scss']
})
export class BlogDashboardComponent implements OnInit, OnDestroy  {
  unsubscribe$: Subject<boolean> = new Subject();
  private questBooksList$ = this.store.select(selectQuestBooksCatalog);
  public bookQuestList = [];

  constructor(private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.questBooksList$.subscribe(questBooks => {
      this.bookQuestList = questBooks;
    });
  }

  openBookQuest(bookQuest: any): void {
    this.router.navigate(['/', 'blog', 'bookquest', bookQuest, '1']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
