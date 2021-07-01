const Router = require('express');
const router = Router()
const {Schema, model, connection} = require('mongoose')
const QuestionModel = require('../models/autoHR/TaskModel');

// take all questions
router.get('/questionList', async (req, res) => {
  const questionList = await QuestionModel.find({});
  res.status(201).json(questionList);
})

// add new question
router.post('/task', async (req, res) => {
  const newTask = new QuestionModel(req.body.params);
  newTask.save((err, done) => {
    if (err) return console.error(err);
    res.status(201).json({task: req.body, message: "saved to question list"});
  })
})

// delete question
router.delete('/task', async (req, res) => {
  const _id = [];
  for (let o in req.query) {
    _id.push(req.query[o])
  }
  QuestionModel.deleteOne({_id: _id.join('')}, (err, done) => {
    if (err) return console.error(err);
    res.status(201).json({item: _id.join(''), message: "deleted from wordModels collection."});
  })
})

// update question
router.put('/task', async (req, res) => {
  const task = req.body.params;
  QuestionModel.updateOne({_id: task._id}, {...req.body.params}, (err, done) => {
    if (err) return console.error(err);
    res.status(201).json({item: req.body, message: "task updated in QuestionsNodels collection."});
  })
})
module.exports = router
