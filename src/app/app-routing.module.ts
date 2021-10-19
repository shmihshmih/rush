import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './shared/components/index/index.component';

const routes: Routes = [
  {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'esperanto',
    loadChildren: () => import('./modules/languages/languages.module').then(m => m.LanguagesModule)
  },
  {
    path: 'english',
    loadChildren: () => import('./modules/languages/languages.module').then(m => m.LanguagesModule)
  },
  {
    path: 'autoHR',
    loadChildren: () => import('./modules/auto-hr/auto-hr.module').then(m => m.AutoHRModule)
  },
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full'
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
