const express = require('express')
const router = express.Router()
const { MongoClient } = require('mongodb')
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)



router.route('/').get(async (req, res) => {
  const word = await client.db('spellingbee').collection('words').findOne({ word: "budget" })
  res.json(word)
  res.end()
})

// router.route('/word').get(async (req, res) => {
//   const word = await client.db('spellingbee').collection('words').findOne({ word: "budget" })
//   res.json(word)
//   res.end()
// })

module.exports = router