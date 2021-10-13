export interface IWordList {
  title: string; // название списка
  collection_caption: string; // название таблицы в базе
  level: string;
  cover: string;
  caption: {
    esperanto: string;
    english: string;
    russian: string
  };
}
