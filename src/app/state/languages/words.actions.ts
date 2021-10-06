import {createAction, props} from '@ngrx/store';
import {IWord} from '../../shared/models/esperanto/word.interface';

export const getAllWords = createAction(`[WORDS Api] Get all words from server`); // получить все слова
export const setWords = createAction(`[WORDS] Set words`, props<{ words: IWord[] }>()); // загрузить все слова
