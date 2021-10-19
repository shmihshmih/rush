export interface IQuestBook {
  author: string;
  collection_caption: string;
  cover: string;
  dateCreated: string;
  item_type: string;
  title: string;
  _id?: any;
}

export interface IQuestBookPart {
  id: number;
  part: string;
  _id: any;
}
