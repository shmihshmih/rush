import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {IListWord} from '../../../../models/esperanto/word_list.interface';
import {EsperantoService} from '../../../../../core/services/esperanto/esperanto.service';

@Component({
  selector: 'app-word-card-settings',
  templateUrl: './word-card-settings.component.html',
  styleUrls: ['./word-card-settings.component.scss']
})
export class WordCardSettingsComponent implements OnInit {
  wordCardSettingsForm: FormGroup;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  listCtrl = new FormControl();
  filteredLists: Observable<IListWord[]>;
  allWordLists: IListWord[] = [];
  activeWordLists: IListWord[] = [];
  @ViewChild('listInput') listInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<WordCardSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private esperantoService: EsperantoService
  ) {
  }

  ngOnInit(): void {
    this.filteredLists = this.listCtrl.valueChanges.pipe(
      startWith(null),
      map((list: string | null) => list ? this._filter(list) : this.listsWithoutSelected())
    );

    this.createWordCardSettingsForm();

    // патчим натсройки по умолчанию
    this.formPatcher(this.wordCardSettingsForm, this.data.settings);

    // получение списка всех списков слов
    this.esperantoService.getWordLists().subscribe(wordList => {
      this.allWordLists = wordList;

      this.data.activeWordLists.forEach(activeWordList => {
        const activeList = this.allWordLists.filter((list: IListWord) => list.caption.esperanto.toLowerCase() === activeWordList.toLowerCase())[0];
        if (activeList) {
          this.activeWordLists.push(activeList);
        }
      });
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const listToAdd = this.allWordLists.filter(list => list.caption.russian === value)[0];
    if (listToAdd) {
      this.activeWordLists.push(listToAdd);
    }
    if (input) {
      input.value = '';
    }
    this.listCtrl.setValue(null);
  }

  remove(title: string): void {
    this.activeWordLists = this.activeWordLists.filter(list => list.title !== title);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const listToAdd = this.allWordLists.filter(list => list.caption.russian === event.option.viewValue)[0];
    this.activeWordLists.push(listToAdd);
    this.listInput.nativeElement.value = '';
    this.listCtrl.setValue(null);
  }

  private _filter(title: string): IListWord[] {
    const filterValue = title.toLowerCase();
    const unselectedLists = this.listsWithoutSelected();
    return unselectedLists.filter(list => list.caption.russian.toLowerCase().indexOf(filterValue) === 0);
  }

  private listsWithoutSelected(): IListWord[] {
    let unSelectedLists = this.allWordLists;
    this.activeWordLists.forEach(list => {
      const filteredLists = unSelectedLists.filter(list2 => list2.caption.russian.toLowerCase() !== list.caption.russian.toLowerCase());
      unSelectedLists = filteredLists;
    });
    return unSelectedLists;
  }

  createWordCardSettingsForm(): void {
    // TODO работа с голосом
    this.wordCardSettingsForm = this.fb.group({
      isRepeat: [false, Validators.required],
      // playbackSpeed: ['1', Validators.required],
      startLang: ['', Validators.required],
      finishLang: ['', Validators.required],
      // voicePitch: ['1', Validators.required],
      // voiceType: ['UK English Male', Validators.required],
    });
  }

  formPatcher(form, data): void {
    form.patchValue({
      ...data
    });
  }

  closePopup(): void {
    this.dialogRef.close({settings: this.wordCardSettingsForm.value, wordLists: this.activeWordLists});
  }

}
