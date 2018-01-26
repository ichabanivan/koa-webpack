var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
// Connection url
var url = 'mongodb://localhost:27017/';
// Connect using MongoClient



module.exports = function (app) {
  MongoClient.connect(url, function (err, db) {
    // Create a collection we want to drop later
    // app.mongodb = db.collection('listCollectionsExample1');

    app.database = db.db('todos')
    // app.database.collection('todos')
  })
};
