import { Component, OnInit } from '@angular/core';
import {loadQuestBooks} from '../../state/blog/blog.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-blog-layout',
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss']
})
export class BlogLayoutComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadQuestBooks());
  }

}
