import {createReducer, on, ReducerObservable} from '@ngrx/store';
import {IWord} from '../../shared/models/esperanto/word.interface';
import {getAllWords} from './words.actions';

export const initialWordsState: ReadonlyArray<IWord> = [];

export const createdWordsReducer = createReducer(
  initialWordsState,
  on(getAllWords, (state) => [...state])
);

export function wordsReducer(state, action): ReadonlyArray<IWord>{
  return createdWordsReducer(state, action);
}
