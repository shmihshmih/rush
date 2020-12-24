const Router = require('express');
const router = Router()
const {Schema, model, connection} = require('mongoose')
const BookQuestListModel = require('../models/blog/BookQuestModel')

// get bookquestlist
router.get('/bookQuestList', async (req, res) => {
  const bookQuestList = await BookQuestListModel.find({});
  res.status(201).json(bookQuestList);
})

// get part of bookquest
router.get('/bookQuest', async (req, res) => {
  // удаляем старую созданную
  delete connection.models[req.query.quest];
  // создаем новую модель + схема
  const BookQuest = model(req.query.quest,
    new Schema(
      {id: {type: Number}, part: {type: String}},
      {collection: req.query.quest}
    )
  )
  // находим нужную часть
  const part = await BookQuest.find({id: +req.query.part});
  res.status(201).json(part);
})

module.exports = router
