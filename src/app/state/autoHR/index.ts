import {ITask} from '../../shared/models/autoHR/question.model';
import {configReducer, tasksReducer} from './autoHR.reducer';
import {ISobesConfigModel} from '../../shared/models/autoHR/sobesConfig.model';

export const autoHRFeatureKey = 'autoHRFeature';

export const autoHRReducers = {
  tasks: tasksReducer,
  config: configReducer
};

export interface State {
  tasks: ITask[];
  config: ISobesConfigModel;
}
