import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EsperantoService} from '../../../../core/services/esperanto/esperanto.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

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
    private esperantoService: EsperantoService
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
    this.esperantoService.addWordList(this.wordListForm.value).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      if (!res.error) {
        this.dialogRef.close(res);
      }
    });
  }

  updateList(wordListId): void {
    this.esperantoService.updateWordList({_id: wordListId, ...this.wordListForm.value}).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      if (!res.error) {
        this.dialogRef.close(res);
      }
    });
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
