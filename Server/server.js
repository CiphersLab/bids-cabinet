var express=require('express');
var app=express();
var mongoose=require('mongoose');
mongoose.connect('mongodb://Asad:abc123@ds047950.mongolab.com:47950/bidmanagement');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
var Schemas=require('./Schemas/Schemas.js');
var Api=require('./Schemas/Api.js');

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("'Access-Control-Allow-Methods',['OPTIONS', 'GET', 'POST']");
    res.header("'Access-Control-Allow-Headers','Content-Type'");

    next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;        // set our port

app.get('/api/getUsers',Api.getUsers)
app.get('/api/findGroups',Api.findGroup);
app.post('/api/addUser',Api.addUser);
app.post('/api/addGroup',Api.addGroup);
app.post('/api/joinGroup',Api.joinGroup);


app.listen(port);
console.log('server is listening on 8000');
