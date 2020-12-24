const {Schema, model} = require('mongoose')

const BookQuestListSchema = new Schema({
  title: {type: String},
  author: {type: String},
  collection_caption: {type: String},
  cover: {type: String},
  dateCreated: {type: Date}
})

module.exports = model('BookQuestListModel', BookQuestListSchema, 'bookquestlist');
