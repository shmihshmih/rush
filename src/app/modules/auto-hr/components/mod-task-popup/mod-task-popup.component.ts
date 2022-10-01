import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ITask} from '../../../../shared/models/autoHR/question.model';
import {Observable} from 'rxjs';
import {selectCompetenceCatalog} from '../../../../state/autoHR/autoHR.selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-mod-task-popup',
  templateUrl: './mod-task-popup.component.html',
  styleUrls: ['./mod-task-popup.component.css']
})
export class ModTaskPopupComponent implements OnInit {
  // TODO dobavit spravochnik ili ne nado
  types = ['question', 'exercise'];
  difficulties = ['beginner', 'junior', 'middle', 'senior'];
  popularities = ['1', '2', '3', '4', '5'];

  taskForm: UntypedFormGroup = new UntypedFormGroup({});

  get linkList() {
    return this.taskForm.controls.answer.get('link') as UntypedFormArray;
  }

  get textList() {
    return this.taskForm.controls.answer.get('text') as UntypedFormArray;
  }

  get codeList() {
    return this.taskForm.controls.answer.get('code') as UntypedFormArray;
  }

  // get competenceList() {
  //   return this.taskForm.get('competence') as FormArray;
  // }

  competencesList$: Observable<string[]> = this.store.select(selectCompetenceCatalog);

  constructor(private fb: UntypedFormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModTaskPopupComponent>,
              private store: Store) {
  }

  ngOnInit(): void {
    this.taskFormBuilder();
    if (this.data?.task) {
      this.taskFormPatcher(this.data.task);
    }
  }

  taskFormBuilder(): void {
    this.taskForm = this.fb.group({
      question: ['', Validators.required],
      description: ['', Validators.required],
      answer: this.fb.group({
        link: this.fb.array([this.fb.control('')]),
        text: this.fb.array([this.fb.control('', Validators.required)]),
        code: this.fb.array([this.fb.control('')]),
      }),
      type: ['', Validators.required],
      difficulty: ['', Validators.required],
      // competence: this.fb.array([this.fb.control('', Validators.required)]),
      popularity: ['', Validators.required],
      competence: [[], Validators.required]
    });
  }

  taskFormPatcher(data: ITask): void {
    // патчим форму
    this.taskForm.patchValue({
      question: data.question,
      description: data.description,
      type: data.type,
      difficulty: data.difficulty,
      popularity: data.popularity,
      competence: data.competence
    });
    // очищаем все списки
    this.linkList.clear();
    this.textList.clear();
    this.codeList.clear();
    // this.competenceList.clear();
    // наполняем массивы
    data.answer.link?.forEach(link => {
      this.linkList.push(this.fb.control(link));
    });
    data.answer.text?.forEach(text => {
      this.textList.push(this.fb.control(text));
    });
    data.answer.code?.forEach(code => {
      this.codeList.push(this.fb.control(code));
    });
    // data.competence?.forEach(c => {
    //   this.competenceList.push(this.fb.control(c));
    // });
  }

  addControl(controlName: string): void {
    if (controlName === 'link') {
      this.linkList.push(this.fb.control(''));
    }
    if (controlName === 'text') {
      this.textList.push(this.fb.control(''));
    }
    if (controlName === 'code') {
      this.codeList.push(this.fb.control(''));
    }
    // if (controlName === 'competence') {
    //   this.competenceList.push(this.fb.control(''));
    // }
  }

  removeControl(controlName: string, i: number): void {
    if (controlName === 'link') {
      this.linkList.removeAt(i);
    }
    if (controlName === 'text') {
      this.textList.removeAt(i);
    }
    if (controlName === 'code') {
      this.codeList.removeAt(i);
    }
    // if (controlName === 'competence') {
    //   this.competenceList.removeAt(i);
    // }
  }

  submit(): void {
    const submitData = {...this.data.task, ...this.taskForm.value};
    this.dialogRef.close(submitData);
  }

}
