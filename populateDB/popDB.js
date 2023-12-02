

app.post('/db', async (req, res) => {
  await client.db('spellingbee').collection('words').insertMany([
    {
      word: "call",
      audio: "https://dictionary.cambridge.org/media/english/uk_pron/u/ukc/ukcal/ukcalip004.mp3",
      definitions: [
        {
          partofSpeech: "verb",
          definition: "to cry out in a loud voice"
        },
        {
          partofSpeech: "noun",
          definition: "to speak loudly, as to attract attention"
        },
      ]
    },
    {
      word: "budget",
      audio: "https://dictionary.cambridge.org/media/english/uk_pron/u/ukb/ukbud/ukbuddh007.mp3",
      definitions: [
        {
          partofSpeech: "noun",
          definition: "an estimate of income and expenditure for a set period of time"
        },
        {
          partofSpeech: "verb",
          definition: "allow or provide a particular amount of money in a budget"
        },
      ]
    }
  ])
  res.end("Inserted docs")
})