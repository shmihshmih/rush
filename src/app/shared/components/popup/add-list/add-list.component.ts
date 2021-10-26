import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {addWordList, updateWordList} from '../../../../state/languages/words/words.actions';
import {IWordList} from '../../../models/esperanto/word_list.interface';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit, OnDestroy {
  wordListForm: FormGroup;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.createWordListForm();
    if (this.data && this.data.wordList) {
      this.formPatcher(this.wordListForm, this.data.wordList);
    }
  }

  createWordListForm(): void {
    this.wordListForm = this.fb.group({
      title: ['', Validators.required],
      collection_caption: ['', Validators.required],
      cover: ['', Validators.required],
      level: ['', Validators.required],
      caption: this.fb.group({
        esperanto: ['', Validators.required],
        english: ['', Validators.required],
        russian: ['', Validators.required],
      })
    });
  }

  addList(): void {
    this.store.dispatch(addWordList({newWordList: this.wordListForm.value}));
    this.dialogRef.close();
  }

  updateList(wordList: IWordList): void {
    const updatedWordList = {...wordList, ...this.wordListForm.value};
    this.store.dispatch(updateWordList({updatedWordList}));
    this.dialogRef.close();
  }

  formPatcher(form, data): void {
    form.patchValue({
      ...data
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
