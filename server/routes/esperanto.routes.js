const Router = require('express')
const router = Router()
const WordListModel = require('../models/esperanto/WordListModel')

router.get('/wordLists', async (req, res) => {
  const ans = await WordListModel.find({});
  res.status(201).json(ans);
  res.send('GET request to the homepage from auth js');
})

module.exports = router
