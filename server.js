var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var isJSON = require('is-json');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(process.env.PORT || 3010,function(){
    console.log("Server running on port 3010");
});

app.get('/results',function(req,res){
    
    var pageNum = req.query.pageNum;
    var limit = req.query.limit;

    var options = {
        uri: 'http://mock-api.smartermeasure.com/v4/results',
        qs:{'page':pageNum,'page_size':limit},
        method: 'GET'
    }

    request(options,function(error,response,body){
        if(body === undefined || !isJSON(body)){
            res.send({status:404,data:'mock api might not be available'});
        }else if(response){
            res.send({status:response.statusCode,data:JSON.parse(response.body)});
        }else{
            res.send({status:error.statusCode,data:'error while fetching response'});
        }
    });
});

app.get('/users/:id',function(req,res){

    var userId = req.params.id;

    var options = {
        uri: 'http://mock-api.smartermeasure.com/v4/users/'+userId,
        method: 'GET'
    }

    request(options,function(error,response,body){
        if(body === undefined || !isJSON(body)){
            res.send({status:404,data:'mock api might not be available'});
        }else if(response){
            res.send({status:response.statusCode,data:JSON.parse(response.body)});
        }else{
            res.send({status:error.statusCode,data:'error while fetching response'});
        }
    });
})


