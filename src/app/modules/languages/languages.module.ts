import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EsperantoService} from '../../core/services/esperanto/esperanto.service';
import {FlexModule} from '@angular/flex-layout';
import {IndexComponent} from './pages/index/index.component';
import {LanguagesRoutingModule} from './languages-routing.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    FlexModule,
    LanguagesRoutingModule,
    SharedModule
  ],
  providers: [EsperantoService]
})
export class LanguagesModule {
}
