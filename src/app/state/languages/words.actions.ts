import {createAction, props} from '@ngrx/store';
import {IWord} from '../../shared/models/esperanto/word.interface';

export const getAllWords = createAction(`[WORDS] Get all words`);
