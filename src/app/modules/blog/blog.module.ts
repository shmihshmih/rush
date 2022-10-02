import {BlogRoutingModule} from './blog-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {BlogService} from '../../core/services/blog/blog.service';
import { BlogDashboardComponent } from './pages/blog-dashboard/blog-dashboard.component';


@NgModule({
  declarations: [BlogDashboardComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ],
  providers: [BlogService]
})
export class BlogModule {
}
