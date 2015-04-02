/**
 * Created by KIM on 2015-04-03.
 */
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

app.engine('html',require('ejs').__express);
app.set('view engine','html');
app.set('views', __dirname + '/public/views');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

MongoClient.connect('mongodb://localhost:27017/cartDB', function(err,db){

    if(err) throw err;

    var cart = db.collection('cart');

    app.get('/',function(req,res){
        res.render('cart');
    });

    app.get('/cart',function(req,res){
        db.collection('cart').find({},{_id:false}).toArray(function(err,docs){
            if(err) throw err;
            res.json(docs);
        });
    });

    app.post('/addCart',function(req,res){
        db.collection('cart').insert(req.body,function(err,doc){
            if(err) throw err;
        });
    });

    app.listen(8080);
    console.log("Server Running on port 8080");
});

