import {createAction, props} from '@ngrx/store';

enum AutoHRActionsTypes {
  loadQuestions = '[AUTO HR] load questions',
  loadQuestionsSuccess = '[AUTO HR] load questions success',
  loadQuestionsFail = '[AUTO HR] load questions fail'
}

export const loadQuestions = createAction(AutoHRActionsTypes.loadQuestions); // effect
export const loadQuestionsSuccess = createAction(AutoHRActionsTypes.loadQuestionsSuccess, props<{ questions }>());
export const loadQuestionsFail = createAction(AutoHRActionsTypes.loadQuestionsFail, props<{ error }>());
