const express = require('express');
const BodyParser = require("body-parser");
const app = express();
app.use(BodyParser.json());
var database;

var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId

const url = "mongodb+srv://dkdinesh:dkdinesh@cluster0-9klps.mongodb.net/test?retryWrites=true&w=majority";

const db_Name="assignment";


app.get("/", function(req, res) {
    try {
      if(req.query.name == undefined || req.query.name == null || req.query.name == ""){
        database.collection("assignment-data").findOne({}, function(err, result) {
          if (err) res.status(400).send('Data Retrieval has been Failed!!');
          else res.status(200).send(result.data);
      });
      }
      else{
        database.collection('assignment-data').aggregate([ 
          { "$match": { "_id": ObjectId('5ed69e5d8a6858a599637bd1') } },
          { "$unwind": "$data" },
          { "$match": { "data.name": req.query.name } }
        ]).toArray(
        function(err, result) {
          if (err) res.status(400).send('Data not found');
          else res.status(200).send(result[0].data);
        })
      }
    } catch (e) {
      res.status(500).send('Internal Server Error!!');
    }
  });

  app.post("/post", function(req, res) {
    try {
      var data = req.body.data;
      if(data == null || data == ""){
        res.status(400).send('No Details found!!');
      }
      else{
        database.collection("assignment-data").updateOne({'_id': ObjectId("5ed69e5d8a6858a599637bd1")},{$addToSet: {'data': data}}, function(err, result) {
          if (err) res.status(400).send('Insertion Failed');
          res.status(200).send('Data has been successfully inserted!!');
      });
      }
    } catch (e) {
      res.status(500).send('Internal Server Error!!!');
    }
      
  });

  
    MongoClient.connect(url, { useNewUrlParser: true },{ useUnifiedTopology: true }, (error, client) => {
        if(error) {
           console.log(error)
        }
        database = client.db(db_Name);
        console.log("Database has been successfully connected")
    });

    app.listen(3000 || process.env)
