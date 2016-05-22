'use strict';

var express = require('express');
var mongo = require('mongodb');
var routes = require('./app/routes/index.js');
var bodyParser = require('body-parser');
var random = require('random-js')();

var app = express();

mongo.connect('mongodb://localhost:27017/tinyurlsdb', function (err, db) {

   if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB on port 27017.');
   }
   
   app.use(bodyParser.json());
   
   app.use(bodyParser.urlencoded({extended:true}));

   app.use('/public', express.static(process.cwd() + '/public'));
   

   routes(app,db,random);
   
   

   app.listen(8080, function () {
      console.log('Node.js listening on port 8080...');
   });

});
