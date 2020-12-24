import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from '../../../../core/services/blog/blog.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();
  public bookQuestList = [];

  constructor(private blogService: BlogService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.blogService.getBookQuestList().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(list => {
      this.bookQuestList = list;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

  openBookQuest(bookQuest: any): void {
    this.router.navigate(['/', 'blog', 'bookquest', bookQuest, '1']);
  }
}
