import {createReducer, on} from '@ngrx/store';
import * as fromQuestions from './index';
import {loadQuestionsFail, loadQuestionsSuccess} from './autoHR.actions';

export const initialAutoHRState: fromQuestions.State = {
  questions: []
};

export const questionReducer = createReducer(initialAutoHRState,
  on(loadQuestionsSuccess, (state, {questions}) => {
    return questions;
  }),
  on(loadQuestionsFail, (state, {error}) => {
    return error;
  }));
