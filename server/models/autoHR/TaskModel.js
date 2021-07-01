const {Schema, model, Types} = require('mongoose');

const QuestionSchema = new Schema({
  id: {type: String},  // систменый id
  question: {type: String}, // основная часть вопроса
  description: {type: String}, // описание задачи\вопроса
  prevDifficulty: [{type: String}], // вопрос по теме, но полегче
  nextDifficulty: [{type: String}], // вопрос по теме, но потруднее
  answer: {
    link: [{type: String}], // ссылка на ресурс
    text: [{type: String}], // самописный ответ
    code: [{type: String}] // код
  },
  type: {type: String},
  difficulty: {type: String}, // сложность вопроса
  competence: [{type: String}], // тема, например Общие вопросы, javascript, react
  popularity: {type: String} // популярность вопроса
})

module.exports = model('QuestionModel', QuestionSchema);
