import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {combineLatest, Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith, tap} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {EsperantoService} from '../../../../../core/services/esperanto/esperanto.service';
import {IWordList} from '../../../../models/esperanto/word_list.interface';
import {Store} from '@ngrx/store';
import {selectSelectedWordLists, selectWordLists} from '../../../../../state/languages/words/words.selectors';

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
  filteredLists: Observable<IWordList[]>;

  allWordLists$: Observable<IWordList[]> = this.store.select(selectWordLists);
  allWordLists: IWordList[] = [];

  activeWordLists$: Observable<string[]> = this.store.select(selectSelectedWordLists);
  activeWordLists: IWordList[] = [];

  @ViewChild('listInput') listInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<WordCardSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private esperantoService: EsperantoService,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.filteredLists = this.listCtrl.valueChanges.pipe(
      startWith(null),
      map((list: string | null) => list ? this._filter(list) : this.listsWithoutSelected())
    );

    combineLatest([this.allWordLists$, this.activeWordLists$]).pipe(
      tap((wordLists: [IWordList[], string[]]) => {
        if ((wordLists[0].length > 0) && (wordLists[1].length > 0)) {

          // листы, которые уже заняты
          this.allWordLists = wordLists[0];
          this.activeWordLists.forEach(activeWordList => {
            const activeList = this.allWordLists.filter(
              (list: IWordList) => list.caption.esperanto.toLowerCase() === activeWordList.collection_caption.toLowerCase()
            )[0];
            if (activeList) {
              this.activeWordLists.push(activeList);
            }
          });

          // листы активные
          const awl = [];
          wordLists[0].forEach((wordList: IWordList) => {
            if (wordLists[1].some(list => wordList.collection_caption === list)) {
              awl.push(wordList);
            }
          });
          this.activeWordLists = [...awl];

        }
      })
    ).subscribe();
    this.createWordCardSettingsForm();

    // патчим настройки по умолчанию
    this.formPatcher(this.wordCardSettingsForm, this.data.settings);
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

  private _filter(title: string): IWordList[] {
    const filterValue = title.toLowerCase();
    const unselectedLists = this.listsWithoutSelected();
    return unselectedLists.filter(list => list.caption.russian.toLowerCase().indexOf(filterValue) === 0);
  }

  private listsWithoutSelected(): IWordList[] {
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
      isAuto: [false, Validators.required],
      timer: [0, Validators.required]
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
