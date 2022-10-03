import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {selectIsAuth} from '../../state/auth/auth.selectors';
import {
  selectAutoHRConfig,
  selectCompetenceCatalog,
  selectDifficultyCatalog,
  selectPopularityCatalog,
  selectTasks
} from '../../state/autoHR/autoHR.selectors';
import {ITask} from '../../shared/models/autoHR/question.model';
import {MatTableDataSource} from '@angular/material/table';
import {combineLatest, Observable, of} from 'rxjs';
import {UntypedFormControl} from '@angular/forms';
import {ISobesConfigModel} from '../../shared/models/autoHR/sobesConfig.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {IUserAdmin} from '../../shared/models/main.interface';
import {checkAuthFail, checkAuthSuccess} from '../../state/auth/auth.actions';
import {initialUserState} from '../../state/auth/auth.reducer';
import {
  addTask, clearAutoHRConfig,
  loadCompetenceCatalog,
  loadDifficultyCatalog,
  loadPopularityCatalog,
  loadTasks,
  loadTasksByJSON, removeTask, setAutoHRConfig, updateTask
} from '../../state/autoHR/autoHR.actions';
import {InterviewPopupComponent} from '../../modules/auto-hr/components/interview-popup/interview-popup.component';
import {TaskAnswerPopupComponent} from '../../modules/auto-hr/components/task-answer-popup/task-answer-popup.component';
import {ModTaskPopupComponent} from '../../modules/auto-hr/components/mod-task-popup/mod-task-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ApiService} from '../../core/services/api.service';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-auto-hr-layout',
  templateUrl: './auto-hr-layout.component.html',
  styleUrls: ['./auto-hr-layout.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AutoHrLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  isAuth$ = this.store.select(selectIsAuth);
  tasks$ = this.store.select(selectTasks);
  config$ = this.store.select(selectAutoHRConfig);
  // просто список тасков. Мы его не меняем, работаем и обрабатываем.
  tasks: ITask[] = [];

  dataSource = new MatTableDataSource<ITask>([]);

  columnsToDisplay = [];
  expandedElement: ITask | null = null;
  step: 'start' | 'interview' | 'catalog' = 'start';

  difficultiesList$: Observable<string[]> = this.store.select(selectDifficultyCatalog);
  difficultiesList: string[] = [];

  competencesList$: Observable<string[]> = this.store.select(selectCompetenceCatalog);
  competencesList: string[] = [];

  popularityList$: Observable<string[]> = this.store.select(selectPopularityCatalog);
  popularityList: string[] = [];

  difficultiesControl = new UntypedFormControl();
  competencesControl = new UntypedFormControl();
  popularityControl = new UntypedFormControl();

  tasksCount = 0;
  typeModel = 0;

  config: ISobesConfigModel = {count: 0, type: 0, difficulty: [], competence: [], popularity: []};

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('taskPaginator')
  set taskPaginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  public user: IUserAdmin;

  resolutionCode = '';

  constructor(
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    private store: Store,
    private afAuth: AngularFireAuth,
    public apiService: ApiService,
    private mediaObserver: MediaObserver
  ) {
    combineLatest(this.tasks$, this.config$).subscribe(([tasks, config]) => {
      if (tasks && config) {
        this.tasks = tasks;
        this.config = config;
        this.setTableData(config);
      }
    });

    this.mediaObserver.asObservable().subscribe(mo => {
      this.resolutionCode = mo[0].mqAlias;
      if (mo[0]?.mqAlias === 'xs') {
        this.columnsToDisplay = ['question'];
      } else {
        this.columnsToDisplay = ['id', 'question', 'type', 'difficulty', 'popularity'];
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.task_id) {
        this.openSolution(params.task_id);
      }
    });
    // получаем справочники
    this.difficultiesList$.subscribe((difficulties) => {
      this.difficultiesList = difficulties;
    });
    this.competencesList$.subscribe((competences) => {
      this.competencesList = competences;
    });
    this.popularityList$.subscribe((popularity) => {
      this.popularityList = popularity;
    });

    this.checkAuth();
  }

  checkAuth(): void {
    this.afAuth.onAuthStateChanged(
      (authData) => {
        if (authData) {
          const user = {
            refreshToken: authData.refreshToken,
            email: authData.email,
            uid: authData.uid,
            displayName: authData.displayName
          };
          this.user = user;
          this.store.dispatch(checkAuthSuccess({authData: user}));
        } else {
          this.user = null;
          this.store.dispatch(checkAuthSuccess({authData: initialUserState}));
        }

        if (!!this.user?.uid) {
          // получение всех вопросов
          this.store.dispatch(loadTasks());
        } else {
          // получение всех вопросов
          this.store.dispatch(loadTasksByJSON());
        }

        // Вещи в любом случае прогружаемые с фронта
        // справочники autoHR
        this.store.dispatch(loadDifficultyCatalog());
        this.store.dispatch(loadCompetenceCatalog());
        this.store.dispatch(loadPopularityCatalog());
      },
      error => {
        return of(checkAuthFail({error: error.toString()}));
      },
      () => {
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.taskPaginator;
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
        this.store.dispatch(setAutoHRConfig({config}));
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
    const answerLink: any[] = [];
    const answerCode: any[] = [];
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
    return {...task, answer: {...task.answer, link: answerLink, code: answerCode}};
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

      if (data.id) {
        // update
        this.store.dispatch(updateTask({updatedTask: data}));
      } else {
        // create
        this.store.dispatch(addTask({newTask: data}));
      }
    });
  }

  // открыть определенный ответ по id таска
  openSolution(id: string): void {
    this.step = 'catalog';
    const task = this.tasks.filter(t => {
      return t.id === id;
    })[0];
    this.openTaskAnswerPopup(task);
  }

  // обновляем данные в таблице в соответствии с новым конфигом
  refreshTable(): void {
    this.config = {
      count: this.tasksCount,
      type: this.typeModel,
      difficulty: this.difficultiesControl.value,
      competence: this.competencesControl.value,
      popularity: this.popularityControl.value
    };
    this.store.dispatch(setAutoHRConfig({config: this.config}));
  }

  // фильтруем таски как надо и выставляем в таблицу
  setTableData(config: ISobesConfigModel): void {
    let newDataSource: ITask[] = [];

    // если нет конфигов, отдаем все
    if (!config.count) {
      newDataSource = this.setTableIndex(0, this.tasks);
      this.dataSource = new MatTableDataSource(newDataSource);
      return;
    }

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
    this.store.dispatch(clearAutoHRConfig());

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
    this.store.dispatch(removeTask({deletedTask: task}));
  }

  // связываем вручную пагинатор и таблицу и данные
  // pagination(paginator: any): void {
  //   let paginatedTasks: any[] = this.tasks.slice(paginator._pageIndex * paginator._pageSize, paginator._pageIndex * paginator._pageSize + paginator._pageSize);
  //   paginatedTasks = this.setTableIndex(paginator._pageIndex * paginator._pageSize, paginatedTasks);
  //   this.dataSource = new MatTableDataSource(paginatedTasks);
  // }

  // проставляем индексы для таблицы
  setTableIndex(start: number, data: any[]): any[] {
    const indexedData = [];
    for (let i = start, j = 0; j < data.length; i++, j++) {
      indexedData.push({...data[j], tableIndex: i + 1});
    }
    return indexedData;
  }

  // скачать дамп задач
  downloadObjectAsJson(): void {
    this.apiService.downloadObjectAsJson(this.tasks, `tasks dump ${new Date()}`);
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearAutoHRConfig());
  }

}
