import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './shared/components/index/index.component';
import {BlogLayoutComponent} from './layouts/blog-layout/blog-layout.component';
import {LanguagesLayoutComponent} from './layouts/languages-layout/languages-layout.component';
import {AutoHrLayoutComponent} from './layouts/auto-hr-layout/auto-hr-layout.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogLayoutComponent,
    title: 'Blog',
    children: [
      {
        path: '',
        title: 'Blog',
        loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
      }
    ]
  },
  {
    path: 'languages',
    component: LanguagesLayoutComponent,
    title: 'Languages',
    children: [
      {
        path: '',
        title: 'Languages',
        loadChildren: () => import('./modules/languages/languages.module').then(m => m.LanguagesModule)
      }
    ]
  },
  {
    path: 'autoHR',
    component: AutoHrLayoutComponent,
    title: 'AutoHR',
    children: [
      {
        path: '',
        title: 'AutoHR',
        loadChildren: () => import('./modules/auto-hr/auto-hr.module').then(m => m.AutoHRModule)
      }
    ]
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
