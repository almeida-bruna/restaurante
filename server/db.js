const mongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectID

const uri = 'mongodb+srv://bruna_03:ZmH9jN9GkoO7jnvJ@cluster0-zz9x9.mongodb.net/test?retryWrites=true&w=majority'
mongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(conn => global.conn = conn.db("fermaquinas"))
    .catch(err => console.log(err))

function insertMessages(message, callback) {
    global.conn.collection('Mensagens').insertOne(message, callback)
}

function findMessagesId(id, callback) {
    global.conn.collection('Mensagens').find(id).toArray(callback)
}

function insertBot(bot, callback) {
    global.conn.collection('Bots').insertOne(bot, callback)
}

function findBotId(id, callback) {
    global.conn.collection('Bots').find(id).toArray(callback)
}

function updateBotId(myquery, newvalues, callback) {
    global.conn.collection('Bots').updateOne(myquery, newvalues, { upsert: true }, callback)
}

function removeBotId(myquery, callback) {
    global.conn.collection('Bots').deleteMany(myquery, { upsert: true }, callback)
}

module.exports = { insertBot, findBotId, insertMessages, updateBotId, removeBotId, findMessagesId }