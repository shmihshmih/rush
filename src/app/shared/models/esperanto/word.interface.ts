export interface IWord {
  _id?: {
    $oid: string;
  }; // рудимент от монгодб
  id: string;
  esperanto: string;
  english: string;
  russian: string;
  word_type?: string[];
  extra_data?: {
    englishSecondForm?: string;
    englishThirdForm?: string;
    wordcode?: string;
    englishWithIng?: string;
  };
}
