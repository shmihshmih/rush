import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'english',
    loadChildren: () => import('./modules/english/english.module').then(m => m.EnglishModule)
  },
  {
    path: 'esperanto',
    loadChildren: () => import('./modules/esperanto/esperanto.module').then(m => m.EsperantoModule)
  },
  {
    path: 'socrates',
    loadChildren: () => import('./modules/socrates/socrates.module').then(m => m.SocratesModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
