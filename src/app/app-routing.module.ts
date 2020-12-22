import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'socrates',
    loadChildren: () => import('./modules/socrates/socrates.module').then(m => m.SocratesModule)
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
    path: '',
    redirectTo: '',
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
