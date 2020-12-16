const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()

const PORT = config.get("port") || 5000

app.use(express.json({extended: true}))

app.use(cors())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/esperanto', require('./routes/esperanto.routes'))

async function start() {
  try {
    await mongoose.connect(config.get('mongoURLesperanto'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log(e.message)
  }
}

start()
