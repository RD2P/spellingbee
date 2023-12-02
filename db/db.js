const { MongoClient } = require('mongodb')
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

const startDB = async () => {
  return client.connect()
    .then(() => console.log("Connected to the database..."))
}

module.exports = startDB



//     const words = client.db('spellingbee').collection('words')
//     const word = await words.findOne(query)
//   } catch (err) {
//     console.log(`Somethign went wrong: ${err}`)
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }


// const 
