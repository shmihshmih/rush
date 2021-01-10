export interface IWord {
  esperanto: string;
  english: string;
  russian: string;
  word_type?: [string];
  extra_data?: {
    englishSecondForm?: string;
    englishThirdForm?: string;
    wordcode?: string;
    englishWithIng?: string;
  };
}
