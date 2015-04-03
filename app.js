/**
 * Created by KIM on 2015-04-03.
 */
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

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
        db.collection('cart').find({}).toArray(function(err,docs){
            if(err) throw err;
            res.json(docs);
        });
    });

    app.post('/addCart',function(req,res){
        db.collection('cart').insert(req.body,function(err,doc){
            if(err) throw err;
            res.json(doc);
        });
    });

    app.delete('/deleteCart/:id',function(req,res){
       var id = req.params.id;
        db.collection('cart').remove({_id:ObjectId(id)},function(err,doc){
           if(err) throw err;
            res.json(doc);
        });
    });

    app.put('/editCart/:id',function(req,res){
        var id = req.params.id;
        var query = {_id:ObjectId(id)};
        var sort = [];
        var operator = {$set: {product:req.body.product , price:req.body.price } };
        var options = { 'new' : true };

        db.collection('cart').findAndModify(query,sort,operator,options,function(err,doc){
            if(err) throw err;
            res.json(doc);
        });
    });
    app.listen(8080);
    console.log("Server Running on port 8080");

    });




