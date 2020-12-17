const {Schema, model, Types} = require('mongoose');

const WordSchema = new Schema({
  _id: Types.ObjectId,
  esperanto: {type: String},
  russian: {type: String},
  english: {type: String},
  word_type: {type: String}
})

module.exports = model('WordModel', WordSchema);
