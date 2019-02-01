const mongoose = require('mongoose');
const fs = require("fs");

const Schema = mongoose.Schema;

const certFileBuf = fs.readFileSync("rds-combined-ca-bundle.pem");

mongoose.Promise = Promise;
  const connection = mongoose.createConnection("mongodb://root:simplepass@test.cluster-cna13kpauevw.us-west-2.docdb.amazonaws.com:27017/adp-dev?replicaSet=rs0", {
    useMongoClient: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30,
    poolSize: 20,
    ssl: true,
    sslValidate: false,
    sslCA: certFileBuf
  });

  connection.on('connected', function() {
    console.log('Mongoose connection open');
  });

  connection.on('error', function(err) {
    console.log('Mongoose connection error: ', err);
  });

  connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
    process.exit(1);
  });

  process.on('SIGINT', function() {
    connection.close(function() {
      console.log('Mongoose ADP connection disconnected through app termination');
      process.exit(1);
    });
  });


const APILog = new Schema ({
    accountid: {
      type: String,
      index: true,
    },
    timestamp: {
      type: Date,
      index: true
    },
    RemoteAddr: String,
    api: {
      type: String,
      index: true
    },
    correlationId: {
      type: String,
      index: true
    },
    body: Schema.Types.Mixed,
    duration: Number,
    request: String,
    request_method: String,
    server: String,
    statusCode: String,
    url: String,
    version: String,
    ownerId: {
      type: String,
      index: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 15
    }
});
  
  
const model = connection.model('apilog', APILog);

const insert = (instance) => {
  return instance.save();
}

const insertMany = (items) => {
  return new Promise((resolve, reject) => {
    model.insertMany(items, function(error, data) {
      if(error) reject(error);
      resolve(data);
    })
  })
}

module.exports = {
  insert,
  model, 
  insertMany
}