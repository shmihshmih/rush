import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DictionaryService} from '../../core/services/esperanto/store/dictionary.service';
import {EsperantoService} from '../../core/services/esperanto/esperanto.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {IndexComponent} from './components/index/index.component';
import {LanguagesRoutingModule} from './languages-routing.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexModule,
    LanguagesRoutingModule,
    SharedModule
  ],
  providers: [DictionaryService, EsperantoService]
})
export class LanguagesModule {
}
