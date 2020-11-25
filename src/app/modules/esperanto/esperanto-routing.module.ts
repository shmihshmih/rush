import {IndexComponent} from './components/index/index.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WordListComponent} from '../../shared/components/word-list/word-list.component';

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
    path: 'vortlisto/:vortListo',
    component: WordListComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsperantoRoutingModule {
}
