import {ITask} from '../../shared/models/autoHR/question.model';
import {questionReducer} from './autoHR.reducer';

export const autoHRFeatureKey = 'autoHRFeature';

export const autoHRReducers = {
  questions: questionReducer
};

export interface State {
  questions: ITask[];
}
