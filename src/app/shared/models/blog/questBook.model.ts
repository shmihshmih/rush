export interface IQuestBook {
  id: string;
  author: string;
  collection_caption: string;
  cover: string;
  dateCreated: string;
  item_type: string;
  title: string;
  _id: {
    $oid: string;
  }; // рудимент от монгодб
}

export interface IQuestBookPart {
  id: number;
  part: string;
  _id: {
    $oid: string;
  }; // от монгодб и основной ид тут
}
