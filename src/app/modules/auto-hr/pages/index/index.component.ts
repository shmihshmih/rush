import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ITask} from '../../../../shared/models/autoHR/question.model';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {ISobesConfigModel} from '../../../../shared/models/autoHR/sobesConfig.model';
import {MatSort} from '@angular/material/sort';
import {AutoHRService} from '../../../../core/services/autohr/auto-hr.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {InterviewPopupComponent} from '../../components/interview-popup/interview-popup.component';
import {TaskAnswerPopupComponent} from '../../components/task-answer-popup/task-answer-popup.component';
import {ModTaskPopupComponent} from '../../components/mod-task-popup/mod-task-popup.component';
import {ApiService} from '../../../../core/services/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class IndexComponent implements OnInit, AfterViewInit {
  // просто список тасков. Мы его не меняем, работаем и обрабатываем.
  tasks: ITask[] = [];
  dataSource = new MatTableDataSource<ITask>();
  columnsToDisplay = ['id', 'question', 'type', 'difficulty', 'popularity'];
  expandedElement: ITask | null = null;
  step: 'start' | 'interview' | 'catalog' = 'start';

  difficultiesList: string[] = [];
  competencesList: string[] = [];
  popularityList: string[] = [];

  difficultiesControl = new FormControl();
  competencesControl = new FormControl();
  popularityControl = new FormControl();

  tasksCount = 0;
  typeModel = 0;

  config: ISobesConfigModel;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: AutoHRService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public ahs: AutoHRService,
    public apiService: ApiService
  ) {
    this.api.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
      const tableDataSrc = this.setTableIndex(0, this.tasks);
      this.dataSource = new MatTableDataSource(tableDataSrc);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.task_id) {
        this.openSolution(params.task_id);
      }
    });
    // получаем справочники
    this.api.getDifficulties().subscribe((difficulties) => {
      this.difficultiesList = difficulties;
    });
    this.api.getCompetences().subscribe((competences) => {
      this.competencesList = competences;
    });
    this.api.getPopularity().subscribe((popularity) => {
      this.popularityList = popularity;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // попап, где проставляем конфиги
  openInterviewPopup(): void {
    const dialogRef = this.dialog.open(InterviewPopupComponent, {
      data: {
        difficultiesList: this.difficultiesList,
        competencesList: this.competencesList,
        popularityList: this.popularityList
      }
    });

    dialogRef.afterClosed().subscribe(config => {
      if (config && config.count) {
        this.step = 'interview';
        this.tasksCount = config.count;
        this.typeModel = config.type;
        this.difficultiesControl.patchValue(config.difficulty);
        this.competencesControl.patchValue(config.competence);
        this.popularityControl.patchValue(config.popularity);
        this.config = config;
        this.setTableData(config);
      }
    });
  }

  // попап с ответом
  openTaskAnswerPopup(task: ITask): void {
    const dialogRef = this.dialog.open(TaskAnswerPopupComponent, {
      maxHeight: '90vh',
      width: '90%',
      data: {task}
    });
    dialogRef.afterClosed().subscribe(data => {
    });
  }

  // очищение таски пустышек, которые возникают на форме создания/редактировани
  clearEmptyArrays(task: ITask): ITask {
    const prevDifficulty: any[] = [];
    const nextDifficulty: any[] = [];
    const answerLink: any[] = [];
    const answerCode: any[] = [];
    task.prevDifficulty?.forEach(prev => {
      if (prev) {
        prevDifficulty.push(prev);
      }
    });
    task.nextDifficulty?.forEach(next => {
      if (next) {
        nextDifficulty.push(next);
      }
    });
    task.answer.link?.forEach(link => {
      if (link) {
        answerLink.push(link);
      }
    });
    task.answer.code?.forEach(code => {
      if (code) {
        answerCode.push(code);
      }
    });
    return {...task, prevDifficulty, nextDifficulty, answer: {...task.answer, link: answerLink, code: answerCode}};
  }

  // попап редактирования таска
  openModTaskPopup(task?: ITask): void {
    const dialogRef = this.dialog.open(ModTaskPopupComponent, {
      maxHeight: '90vh',
      width: '95%',
      data: {task}
    });
    dialogRef.afterClosed().subscribe(data => {
      if (!data) {
        return;
      }

      data = this.clearEmptyArrays(data);

      // с формы приходят только ид, тут мы докидываем caption, чтобы потом просто отображать в таблице
      let prevDifficulty = [];
      let nextDifficulty = [];

      if (data.prevDifficulty.length > 0) {
        prevDifficulty = data.prevDifficulty.map((pr: string) => {
          return this.tasks.filter(task1 => {
            return +task1.id === +pr;
          })[0];
        }).map((task2: ITask) => {
          return {id: task2.id, caption: task2.question};
        });
      }

      if (data.nextDifficulty.length > 0) {
        nextDifficulty = data.nextDifficulty.map((pr: string) => {
          return this.tasks.filter(task => {
            return +task.id === +pr;
          })[0];
        }).map((task: ITask) => {
          return {id: task.id, caption: task.question};
        });
      }

      if (data._id) {
        // update
        this.ahs.updateTask(data).subscribe(res => {
          this.tasks[data.tableIndex - 1] = {...data, prevDifficulty, nextDifficulty};
          const tableDataSrc = this.setTableIndex(0, this.tasks);
          this.dataSource = new MatTableDataSource(tableDataSrc);
        });
      } else {
        // create
        this.ahs.addTask(data).subscribe(res => {
          this.tasks.push({...data, prevDifficulty, nextDifficulty});
          const tableDataSrc = this.setTableIndex(0, this.tasks);
          this.dataSource = new MatTableDataSource(tableDataSrc);
        });
      }
    });
  }

  // открыть определенный ответ по id таска
  openSolution(id: string): void {
    this.step = 'catalog';
    const task = this.tasks.filter(task => {
      return task.id == id;
    })[0];
    this.openTaskAnswerPopup(task);
  }

  // обновляем данные в таблице в соответсвии с новым конфигом
  refreshTable(): void {
    this.config = {
      count: this.tasksCount,
      type: this.typeModel,
      difficulty: this.difficultiesControl.value,
      competence: this.competencesControl.value,
      popularity: this.popularityControl.value
    };
    this.setTableData(this.config);
  }

  // фильтруем таски как надо и выставляем в таблицу
  setTableData(config: ISobesConfigModel): void {
    let newDataSource: ITask[] = [];

    const matchedQuestions: ITask[] = [];
    const matchedExercises: ITask[] = [];
    const unmatchedQuestions: ITask[] = [];
    const unmatchedExercises: ITask[] = [];

    const questionNumber = Math.round(config.count * config.type / 100);
    const exerciseNumber = config.count - questionNumber;

    this.tasks.forEach((task: ITask) => {
      const taskChecker = (task: ITask, config: ISobesConfigModel) => {
        return task.competence.every(v => config.competence.includes(v));
      };
      if (config.difficulty.includes(task.difficulty) && config.popularity.includes(task.popularity) && taskChecker(task, config)) {
        if (task.type === 'question') {
          matchedQuestions.push(task);
        }
        if (task.type === 'exercise') {
          matchedExercises.push(task);
        }
      } else {
        if (task.type === 'question') {
          unmatchedQuestions.push(task);
        } else if (task.type === 'exercise') {
          unmatchedExercises.push(task);
        } else {
          unmatchedQuestions.push(task);
        }
      }
    });

    const matchedQuestionsRandom = [];
    for (let i = 0; i < matchedQuestions.length; i++) {
      const it = this.randomizer(matchedQuestions);
      matchedQuestionsRandom.push(it);
    }

    const matchedExercisesRandom = [];
    for (let i = 0; i < matchedExercises.length; i++) {
      const it = this.randomizer(matchedExercises);
      matchedExercisesRandom.push(it);
    }

    const unmatchedQuestionsRandom = [];
    for (let i = 0; i < unmatchedQuestions.length; i++) {
      const it = this.randomizer(unmatchedQuestions);
      unmatchedQuestionsRandom.push(it);
    }

    const unmatchedExercisesRandom = [];
    for (let i = 0; i < unmatchedExercises.length; i++) {
      const it = this.randomizer(unmatchedExercises);
      unmatchedExercisesRandom.push(it);
    }

    const questions: ITask[] = matchedQuestionsRandom.concat(unmatchedQuestionsRandom);
    const exercises: ITask[] = matchedExercisesRandom.concat(unmatchedExercisesRandom);

    newDataSource.push(...questions.slice(0, questionNumber));
    newDataSource.push(...exercises.slice(0, exerciseNumber));

    if (questionNumber > questions.length) {
      newDataSource.push(...exercises.slice(exerciseNumber, exerciseNumber + questionNumber - questions.length));
    }

    if (exerciseNumber > exercises.length) {
      newDataSource.push(...questions.slice(questionNumber, questionNumber + exerciseNumber - exercises.length));
    }
    newDataSource = this.setTableIndex(0, newDataSource);
    this.dataSource = new MatTableDataSource(newDataSource);
  }

  // перемешиваем все элементы в предложенном массиве
  randomizer(arr: ITask[]): any {
    const itemNum = Math.floor(Math.random() * arr.length);
    return arr.splice(itemNum, 1)[0];
  }

  /**
   * Сбрасываем все конфиги и идем на первую
   * @param type: 'reset-filters' | 'close-block'
   */
  goToStart(type: 'reset-filters' | 'close-block'): void {
    this.config = {
      count: 0,
      type: 0,
      difficulty: [],
      competence: [],
      popularity: []
    };

    this.dataSource = new MatTableDataSource(this.setTableIndex(0, this.tasks));

    this.difficultiesControl.reset();
    this.competencesControl.reset();
    this.popularityControl.reset();
    this.tasksCount = 0;
    this.typeModel = 0;

    if (type === 'close-block') {
      this.step = 'start';
    }
  }

  // удаление таска
  removeTask(task: ITask): void {
    const isRemove = confirm('Удалить вопрос из таблицы?');
    if (!isRemove) {
      return;
    }
    this.ahs.delTask(task).subscribe(res => {
      const newDataSource = this.dataSource.filteredData.filter((item: ITask) => {
        return item.id !== task.id;
      });
      this.dataSource = new MatTableDataSource(newDataSource);
    });
  }

  // связываем вручную пагинатор и таблицу и данные
  pagination(paginator: any): void {
    let paginatedTasks: any[] = this.tasks.slice(paginator._pageIndex * paginator._pageSize, paginator._pageIndex * paginator._pageSize + paginator._pageSize);
    paginatedTasks = this.setTableIndex(paginator._pageIndex * paginator._pageSize, paginatedTasks);
    this.dataSource = new MatTableDataSource(paginatedTasks);
  }

  // проставляем индексы для таблицы
  setTableIndex(start: number, data: any[]): any[] {
    const indexedData = [];
    for (let i = start, j = 0; j < data.length; i++, j++) {
      indexedData.push({...data[j], tableIndex: i + 1});
    }
    return indexedData;
  }
}
