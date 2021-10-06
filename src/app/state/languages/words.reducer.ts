import {createReducer, on} from '@ngrx/store';
import {IWord} from '../../shared/models/esperanto/word.interface';
import {setWords} from './words.actions';

export const initialWordsState: ReadonlyArray<IWord> = [];

export const createdWordsReducer = createReducer(
  initialWordsState,
  on(setWords, (state, {words}) => {
    return [...state, ...words];
  })
);

export function wordsReducer(state, action): ReadonlyArray<IWord> {
  return createdWordsReducer(state, action);
}
