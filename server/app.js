const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const app = express()

const PORT = config.get("port") || 5000

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded( {extended: true} ))
app.use(express.json({extended: true}))

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.use(cors())

app.use('/api/user', require('./routes/auth.routes'))
app.use('/api/esperanto', require('./routes/esperanto.routes'))
app.use('/api/blog', require('./routes/blog.routes'))

async function start() {
  try {
    await mongoose.connect(config.get('MongoRushService'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    app.listen(PORT, () => {})
  } catch (e) {}
}

start()
