import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoHRRoutingModule} from './auto-hr-routing.module';
import {InterviewPopupComponent} from './components/interview-popup/interview-popup.component';
import {TaskAnswerPopupComponent} from './components/task-answer-popup/task-answer-popup.component';
import {ModTaskPopupComponent} from './components/mod-task-popup/mod-task-popup.component';
import {MaterialModule} from '../../shared/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    InterviewPopupComponent,
    TaskAnswerPopupComponent,
    ModTaskPopupComponent
  ],
  imports: [
    CommonModule,
    AutoHRRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AutoHRModule {
}
