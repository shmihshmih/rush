export interface ITask {
  _id: {
    $oid: string;
  }; // рудимент от монгодб
  id: string; // систменый id
  tableIndex?: number; // используется в таблицах
  question: string; // основная часть вопроса
  description: string; // описание задачи\вопроса
  answer: {
    link?: string[]; // ссылка на ресурс
    text: string[]; // самописный ответ
    code?: string[]; // код
  };
  type: 'question' | 'exercise';
  difficulty: 'beginner' | 'junior' | 'middle' | 'senior'; // сложность вопроса
  competence: string[]; // тема, например Общие вопросы, javascript, react
  popularity: string; // популярность вопроса
}
