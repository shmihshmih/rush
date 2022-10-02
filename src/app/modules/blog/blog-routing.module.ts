import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookQuestComponent} from '../../shared/components/book-quest/book-quest.component';
import {BlogDashboardComponent} from './pages/blog-dashboard/blog-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: BlogDashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'bookquest/:quest/:part',
    component: BookQuestComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
