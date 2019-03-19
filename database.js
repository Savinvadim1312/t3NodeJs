var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

database = null;

MongoClient.connect(process.env.DB_URI, function(err, db) {
  if (err) throw err;
  database = db.db('coinversable');
  console.log("Connected to database");
});

module.exports.logTTN = async (payload) => {
    if (database == null) {
        return;
    }
    payload.payload_string = String(payload.payload_raw)
    database.collection('ttn_requests').insertOne(payload);
}