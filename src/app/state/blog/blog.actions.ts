import {createAction, props} from '@ngrx/store';

/** quest book */
enum QuestBookActionsTypes {
  loadQuestBooks = '[BLOG quest book] load quest books',
  loadQuestBooksSuccess = '[BLOG quest book] load quest books Success',
  loadQuestBooksFail = '[BLOG quest book] load quest books Fail',

  loadActiveQuestBook = '[BLOG quest book] load active quest book',
  loadActiveQuestBookSuccess = '[BLOG quest book] load active quest book success',
  loadActiveQuestBookFail = '[BLOG quest book] load active quest book fail',
  clearActiveQuestBook = '[BLOG quest book] clear active quest book',

  setSelectedQuestBookPart = '[BLOG quest book] set quest book part',
  clearSelectedQuestBookPart = '[BLOG quest book] clear quest book part'
}

/** quest book catalog */
export const loadQuestBooks = createAction(QuestBookActionsTypes.loadQuestBooks); // effect
export const loadQuestBooksSuccess = createAction(QuestBookActionsTypes.loadQuestBooksSuccess, props<{ questBooks }>());
export const loadQuestBooksFail = createAction(QuestBookActionsTypes.loadQuestBooksFail, props<{ error }>());

/** active quest book */
export const loadActiveQuestBook =
  createAction(QuestBookActionsTypes.loadActiveQuestBook, props<{ activeQuestBookCollectionCaption }>()); // effect
export const loadActiveQuestBookSuccess =
  createAction(QuestBookActionsTypes.loadActiveQuestBookSuccess, props<{ collection_caption, dataCollection, selectedPart }>());
export const loadActiveQuestBookFail =
  createAction(QuestBookActionsTypes.loadActiveQuestBookFail, props<{ error }>());
export const clearActiveQuestBook = createAction(QuestBookActionsTypes.clearActiveQuestBook);

/** selected quest book part */
export const setSelectedQuestBookPart = createAction(QuestBookActionsTypes.setSelectedQuestBookPart, props<{ selectedPart }>());
export const clearSelectedQuestBookPart = createAction(QuestBookActionsTypes.clearSelectedQuestBookPart);
