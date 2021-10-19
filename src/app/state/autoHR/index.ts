import {ITask} from '../../shared/models/autoHR/question.model';
import {catalogReducer, configReducer, tasksReducer} from './autoHR.reducer';
import {ISobesConfigModel} from '../../shared/models/autoHR/sobesConfig.model';

export const autoHRFeatureKey = 'autoHRFeature';

export const autoHRReducers = {
  tasks: tasksReducer,
  config: configReducer,
  catalogs: catalogReducer
};

export interface State {
  tasks: ITask[];
  config: ISobesConfigModel;
  catalogs: {
    difficultyCatalog: string[];
    competenceCatalog: string[];
    popularityCatalog: string[];
  };
}
