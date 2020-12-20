const Router = require('express')
const router = Router()
const WordListModel = require('../models/esperanto/WordListModel')
const WordModel = require('../models/esperanto/WordModel')

// take all wordLists
router.get('/wordLists', async (req, res) => {
  const wordlists = await WordListModel.find({});
  res.status(201).json(wordlists);
})

// take all words from word list
router.get('/wordList', async (req, res) => {
  const words = await WordModel.find({word_type: req.query.wordList});
  res.status(201).json(words);
})

// add word list
router.post('/wordList', async (req, res) => {
  const newWordList = new WordListModel(req.body.params);
  newWordList.save((err, done) => {
    if (err) return console.error(err);
    res.status(201).json({item: req.body, message: "saved to wordListModels collection."});
  });
})

// delete word list
router.delete('/wordList', async (req, res) => {
  const _id = [];
  for (let o in req.query) {
    _id.push(req.query[o])
  }
  WordListModel.deleteOne({_id: _id.join('')}, (err, done) => {
    if (err) return console.error(err);
    res.status(201).json({item: _id.join(''), message: "deleted from wordListModels collection."});
  })
})

// update word list
router.put('/wordList', async (req, res) => {
  const wordList = req.body.params;
  WordListModel.updateOne({_id: wordList._id}, {...req.body.params}, (err, done) => {
    if (err) return console.error(err);
    res.status(201).json({item: req.body, message: "item updated in wordListModels collection."});
  })
})

module.exports = router
