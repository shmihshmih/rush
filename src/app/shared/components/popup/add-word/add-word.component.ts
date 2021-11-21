import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {IWordList} from '../../../models/esperanto/word_list.interface';
import {Store} from '@ngrx/store';
import {selectWordLists} from '../../../../state/languages/words/words.selectors';
import {addWord, updateWord} from '../../../../state/languages/words/words.actions';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit, OnDestroy {
  // autocomplete list
  wordLists: string[] = [];
  selectedWordLists: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  listCtrl = new FormControl();
  filteredLists: Observable<string[]>;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  unsubscribe$: Subject<boolean> = new Subject();
  wordForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddWordComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.createWordForm();
    if (this.data && this.data.word) {
      this.formPatcher(this.wordForm, this.data.word);
      this.selectedWordLists = this.data.word.word_type;
    }

    this.store.select(selectWordLists).pipe(
      map((lists: IWordList[], i): string[] => {
        return lists.map(list => list.collection_caption);
      }),
      takeUntil(this.unsubscribe$)
    )
      .subscribe(lists => {
        this.wordLists = lists;
        this.filteredLists = this.listCtrl.valueChanges.pipe(
          startWith(null),
          map((list: string[] | null) => list ? this._filter(list) : this.wordLists.slice()));
      });

  }

  createWordForm(): void {
    this.wordForm = this.fb.group({
      word_type: [this.selectedWordLists, Validators.required],
      esperanto: ['', Validators.required],
      english: ['', Validators.required],
      russian: ['', Validators.required],
    });
  }

  formPatcher(form, data): void {
    form.patchValue({
      ...data
    });
  }

  addWord(): void {
    this.store.dispatch(addWord({newWord: this.wordForm.value}));
    this.dialogRef.close();
  }

  updateWord(wordId): void {
    this.store.dispatch(updateWord({updatedWord: {id: wordId, ...this.wordForm.value}}));
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.selectedWordLists.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.listCtrl.setValue(null);
  }

  remove(list: string): void {
    const index = this.selectedWordLists.indexOf(list);

    if (index >= 0) {
      this.selectedWordLists.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedWordLists.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.listCtrl.setValue(null);
  }

  private _filter(value: string[]): string[] {
    return this.wordLists
      .filter((list: string) => !value.includes(list));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

}
