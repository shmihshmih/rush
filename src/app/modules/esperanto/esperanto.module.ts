import { DictionaryService } from './../../core/services/esperanto/store/dictionary.service';
import { EsperantoService } from './../../core/services/esperanto/esperanto.service';
import { EsperantoRoutingModule } from './esperanto-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    EsperantoRoutingModule
  ],
  providers: [DictionaryService, EsperantoService]
})
export class EsperantoModule { }
