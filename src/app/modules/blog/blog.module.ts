import {BlogRoutingModule} from './blog-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './pages/index/index.component';
import {SharedModule} from '../../shared/shared.module';
import {BlogService} from '../../core/services/blog/blog.service';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ],
  providers: [BlogService]
})
export class BlogModule {
}
