'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.connect = connect;
exports.getDocuments = getDocuments;
exports.getDocument = getDocument;
exports.createDocument = createDocument;
exports.updateDocument = updateDocument;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _mongodb = require('mongodb');

function connect() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$host = _ref.host;
  var host = _ref$host === undefined ? 'localhost' : _ref$host;
  var _ref$port = _ref.port;
  var port = _ref$port === undefined ? 27017 : _ref$port;
  var _ref$database = _ref.database;
  var database = _ref$database === undefined ? _app2['default'].get('DB') : _ref$database;

  return new Promise(function (resolve, reject) {
    var url = process.env.MONGOLAB_URI || 'mongodb://' + host + ':' + port + '/' + database;
    _mongodb.MongoClient.connect(url, function (err, db) {
      err ? reject(err) : resolve(db);
    });
  });
}

function getDocuments(collection) {
  return new Promise(function (resolve, reject) {
    var documents = [];
    connect().then(function (db) {
      return db.collection(collection).find();
    }).then(function (cursor) {
      cursor.each(function (err, doc) {
        if (err) return reject(Error(err));
        doc ? documents.push(doc) : resolve(documents);
      });
    });
  });
}

function getDocument(name, collection) {
  return new Promise(function (resolve, reject) {
    connect().then(function (db) {
      return db.collection(collection).findOne({ name: name.toLowerCase() }, function (err, doc) {
        if (err) return reject(err);
        resolve(doc);
      });
    });
  });
}

function createDocument(doc, collection) {
  return new Promise(function (resolve, reject) {
    connect().then(function (db) {
      db.collection(collection).count().then(function (count) {
        if (count >= _app2['default'].get(collection.toUpperCase())) {
          return reject("Max limit reached.");
        }
        db.collection(collection).insertOne(doc, function (err, result) {
          if (err) return reject(err);
          resolve(doc);
        });
      });
    });
  });
}

function updateDocument(doc, collection) {
  return new Promise(function (resolve, reject) {
    connect().then(function (db) {
      return db.collection(collection).update({ _id: doc._id }, doc);
    }).then(resolve, reject);
  });
}