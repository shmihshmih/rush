import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {BlogService} from '../../../core/services/blog/blog.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-book-quest',
  templateUrl: './book-quest.component.html',
  styleUrls: ['./book-quest.component.scss']
})
export class BookQuestComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject();
  questPart: { type: string, data: string, order: number }[];
  questTitle: string;

  constructor(private activatedRoute: ActivatedRoute,
              private blogService: BlogService,
              public location: Location
  ) {
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      if (params.quest) {
        this.blogService.getQuestPart(params.quest, params.part).subscribe((text: { part: string, id: number }) => {
          this.questTitle = params.quest;
          const parts = [];

          // собираем массив ссылок, это просто текст в сообщении, который имеет форму [число]
          // если таковых нет, то помещается один объект type: 'no-data' с ссылкой назад
          let linkMatches: any[] = text[0].part.match(/\[[0-9]*]/g);
          if (linkMatches) {
            linkMatches = linkMatches.map((link: string, i) => {
              return {type: 'link', order: i, data: link.slice(1, link.length - 1)};
            });
          } else {
            linkMatches = [{type: 'no-data'}];
          }

          // собираем массив текстов, без ссылок
          // если таковых нет, то помещается один объект type: 'no-data' с ссылкой назад
          let textMatchas = text[0].part.split(/\[[0-9]*]/g);
          if (textMatchas) {
            textMatchas = textMatchas.map((txt: string, i) => {
              return {type: 'txt', order: i, data: txt};
            });
          } else {
            textMatchas = [{type: 'no-data'}];
          }

          // составляем общий объект текстов и ссылок, чтобы разместить на странице через ngSwitch. Исходит из того, что первый элемент - не ссылка.
          const allPartsNumber = linkMatches.length + textMatchas.length;
          for (let i = 0; allPartsNumber > i; i++) {
            const textToPush = textMatchas.shift();
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
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

}
