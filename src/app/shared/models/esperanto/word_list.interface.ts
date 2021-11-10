export interface IWordList {
  _id?: {
    $oid: string;
  }; // рудимент от монгодб
  id: string;
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
