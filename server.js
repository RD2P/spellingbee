const path = require('path')
const cors = require('cors')
const express = require('express')
const startDB = require('./db/db')
const wordList = require('./words')
const { MongoClient } = require('mongodb')
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static('./frontend/dist'))

const collection = client.db('spellingbee').collection('words')

app.get('/api/v1', async (req, res) => {
  const w = req.query.word
  const word = await collection.findOne({ word: w })
  res.json(word)
  res.end()
})

app.get('/api/v1/random', async (req, res) => {
  const word = await collection.findOne()
  res.json(word)
  res.end()
})

const PORT = process.env.PORT || 4000

//Connect to db and start server
const start = async () => {
  try {
    await startDB()
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}

start()