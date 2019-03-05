var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost/swag-shop');
var db = mongoose.connect('mongodb://vinodh:bhuvin99@ds145669.mlab.com:45669/employeedata');

var Product = require('./model/product');
var WishList = require('./model/wishlist');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(process.env.PORT || 3010,function(){
    console.log("swag shop API running on port 3010");
});

app.post('/product',function(req,res){
    var product = new Product();
    product.firstName = req.body.firstName;
    product.lastName = req.body.lastName,
    product.dob = req.body.dob,
    product.homePhone= req.body.homePhone,
    product.workPhone = req.body.workPhone
    product.title = req.body.title; 
    product.price = req.body.price;
    product.imgUrl = req.body.imgUrl;
    console.log(req.body.imgUrl);

    // product.populate(req.body.imgUrl);

    //product.imgUrl = req.body.imgUrl;
    product.save(function(err, savedProduct){
        if (err){
            res.status(500).send({error:'could not save product'});
        }else{
            res.send(savedProduct);
        }
    });
    
});

app.put('/product', function(req,res){
// Product.findOne({_id: req.body.productId}, function(err, product){

//     console.log(req.body.productId);    

    Product.findOneAndUpdate({_id: req.body.productId}, {$set: {imgUrl: req.body.imgUrl}},(err,data)=>{
        console.log(data);
        console.log(err);
    });


//         if(err){
//             res.send({error:'could not update the item'});
//         }else{
//             Product.findAndModify({_id: req.body.productId}, {$set: {imgUrl: req.body.imgUrl}});
//         }
    // })
        //res.body = "Done";
    return res.send("Done")
 });

app.get('/product',function(req,res){
    Product.find({firstName: req.query.firstName},function(err,products){
        if(err){
            res.send({error:'could not fetch products'});
        }else{
            res.send(products);
        }
    });

});

app.get('/products',function(req,res){
    Product.find({},function(err,products){
        if(err){
            res.send({error:'could not fetch products'});
        }else{
            res.send(products);
        }
    });

});

app.post('/wishList',function(req,res){
    var wishList = new WishList();
    wishList.title = req.body.title;
    wishList.save(function(err,newWishlist){
        if(err){
            res.send({error:'could not fetch products'});
        }else{
            res.send(newWishlist);
        }
    })
});


app.get('/wishlist', function(req,res){
    WishList.find({}).populate({path: 'products',model:'Product'}).exec(function(err,wishLists)
    {
        if(err){
        res.status(500).send({error: 'could not fetch wishlists'});
        }else{
            res.send(wishLists);
        }
    })
});
//we are defining the path and model that has to be populated. Path comes from the wishlist.js file 
// which contains 'products' while model is retrive from the product.js where the fields or data of 
// the object are stored.Then we execute using the exec keyword and return the wishlists along with the data.


app.put('/wishlist/add',function(req,res){
    Product.findOne({_id: req.body.productId}, function(err, product){
        if(err){
            res.send({error:'could not add item to the wishlist'});
        }else{
            WishList.update({_id: req.body.wishListId}, {$addToSet: {products: product._id}})
//            ,function(err,wishList){
//               if(err){
//                   res.send({error:'wishlist could not be updated'});
//               }else{
//                   res.send("added to wishlist successfully");
//               }
            }//updating the user specified wishlistId with the found product
        })
    })



