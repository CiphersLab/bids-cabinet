var express=require('express');
var app=express();
var mongoose=require('mongoose');
mongoose.connect('mongodb://Asad:abc123@ds047950.mongolab.com:47950/bidmanagement');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
var Schemas=require('./Schemas/Schemas.js');
var Api=require('./Schemas/Api.js');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;        // set our port


app.post('/api/addUser',Api.addUser);
app.post('/api/addGroup',Api.addGroup);
app.post('/api/joinGroup',Api.joinGroup);


app.listen(port);
console.log('server is listening on 8080');
