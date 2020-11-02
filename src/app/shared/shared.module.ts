import { NavListComponent } from './components/nav-list/nav-list.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
  declarations: [
    HeaderComponent,
    NavListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    NavListComponent,
    FlexLayoutModule]
})
export class SharedModule { }
