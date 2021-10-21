import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {BlogService} from '../../../core/services/blog/blog.service';
import {Location} from '@angular/common';
import {IQuestBookPart} from '../../models/blog/questBook.model';
import {Store} from '@ngrx/store';
import {
  clearActiveQuestBook,
  clearSelectedQuestBookPart,
  loadActiveQuestBook,
  setSelectedQuestBookPart
} from '../../../state/blog/blog.actions';
import {selectActiveQuestBook, selectQuestBookPart} from '../../../state/blog/blog.selectors';

@Component({
  selector: 'app-book-quest',
  templateUrl: './book-quest.component.html',
  styleUrls: ['./book-quest.component.scss']
})
export class BookQuestComponent implements OnInit, OnDestroy {
  activeQuestBook$ = this.store.select(selectActiveQuestBook);

  selectQuestBookPart$ = this.store.select(selectQuestBookPart);

  questPartParam: string;

  unsubscribe$: Subject<boolean> = new Subject();
  questPart: { type: string, data: string, order: number }[];
  questTitle: string;

  constructor(private activatedRoute: ActivatedRoute,
              private blogService: BlogService,
              public location: Location,
              private store: Store
  ) {
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      if (params.quest && params.part) {
        this.questTitle = params.quest;
        this.questPartParam = params.part;
        this.store.dispatch(setSelectedQuestBookPart({selectedPart: params.part}));
      }
    });
  }

  ngOnInit(): void {

    this.activeQuestBook$.subscribe(activeQuestBook => {
      // если в нашем сторе нет нужной книги - грузим, если уже есть, больше не грузим
      if (this.questTitle && (activeQuestBook.collection_caption !== this.questTitle)) {
        this.store.dispatch(loadActiveQuestBook({activeQuestBookCollectionCaption: this.questTitle}));
      }
    });

    this.selectQuestBookPart$.subscribe((questBookPart: IQuestBookPart) => {
      if (!questBookPart?.part) {
        return;
      }
      const parts = [];

      // собираем массив ссылок, это просто текст в сообщении, который имеет форму [число]
      // если таковых нет, то помещается один объект type: 'no-data' с ссылкой назад
      let linkMatches: any[] = questBookPart.part.match(/\[[0-9]*]/g);
      if (linkMatches) {
        linkMatches = linkMatches.map((link: string, i) => {
          return {type: 'link', order: i, data: link.slice(1, link.length - 1)};
        });
      } else {
        linkMatches = [{type: 'no-data'}];
      }

      // собираем массив текстов, без ссылок
      // если таковых нет, то помещается один объект type: 'no-data' с ссылкой назад
      let textMatches: any[] = questBookPart.part.split(/\[[0-9]*]/g);
      if (textMatches) {
        textMatches = textMatches.map((txt: string, i) => {
          return {type: 'txt', order: i, data: txt};
        });
      } else {
        textMatches = [{type: 'no-data'}];
      }

      // составляем общий объект текстов и ссылок, чтобы разместить на странице через ngSwitch. Исходит из того, что первый элемент - не ссылка.
      const allPartsNumber = linkMatches.length + textMatches.length;
      for (let i = 0; allPartsNumber > i; i++) {
        const textToPush = textMatches.shift();
        if (textToPush) {
          parts.push(textToPush);
        }
        const linkToPush = linkMatches.shift();
        if (linkToPush) {
          parts.push(linkToPush);
        }
      }
      this.questPart = parts;
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearActiveQuestBook());
    this.store.dispatch(clearSelectedQuestBookPart());
    this.unsubscribe$.complete();
  }

}
