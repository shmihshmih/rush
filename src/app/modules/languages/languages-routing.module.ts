import {IndexComponent} from './pages/index/index.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WordListComponent} from '../../shared/components/word-list/word-list.component';
import {WordCardComponent} from '../../shared/components/word-card/word-card.component';
import {EnglishSentencesCreatorComponent} from './pages/english-sentences-creator/english-sentences-creator.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full'
  },
  {
    path: 'vortlisto',
    component: WordListComponent,
    pathMatch: 'full'
  },
  {
    path: 'vortlisto/:wordList',
    component: WordListComponent,
    pathMatch: 'full'
  },
  {
    path: 'vortokarto/',
    component: WordCardComponent,
    pathMatch: 'full'
  },
  {
    path: 'vortokarto/:wordList',
    component: WordCardComponent,
    pathMatch: 'full'
  },
  {
    path: 'wordList',
    component: WordListComponent,
    pathMatch: 'full'
  },
  {
    path: 'wordList/:wordList',
    component: WordListComponent,
    pathMatch: 'full'
  },
  {
    path: 'wordCard/',
    component: WordCardComponent,
    pathMatch: 'full'
  },
  {
    path: 'wordCard/:wordList',
    component: WordCardComponent,
    pathMatch: 'full'
  },
  {
    path: 'sentences-creator',
    component: EnglishSentencesCreatorComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguagesRoutingModule {
}
