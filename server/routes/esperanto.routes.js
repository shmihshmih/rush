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

module.exports = router
