const {Schema, model, Types} = require('mongoose')

const WordListSchema = new Schema({
  title: {type: String},
  collection_caption: {type: String},
  cover: {type: String},
  level: {type: String},
  caption: {
    esperanto: {type: String},
    english: {type: String},
    russian: {type: String},
  }
})

module.exports = model('WordListModel', WordListSchema);
