var express = require('express');
var router = express.Router();
var Moltin = require('../utils/common')

//initiate moltin object
moltin = new Moltin()

/* GET: Some basic routes */
router.get('/', function (req, res, next) {

  out = moltin.get_products()
  out.then(function(product){
    console.log("out is ",product)

    res.json({result: product['data']});
  }).catch(function(res){
    res.status(500);
    res.json({'error': '500'});
  })
});

router.get('/add/:id', function (req, res, next) {
  product_id = req.params.id
  console.log('Adding to cart', product_id)
  // // adding to cart
  // function(moltin.add_to_cart(product_id), function(){

  // });
  out = moltin.add_to_cart(product_id);
  out.then(function(product){
    console.log("out is ", product)
  }).catch(function(res){
    res.status(500)
    res.json({'error': '500'})
  })
  res.json({ok: 'ok'})
});

router.get('/get_cart', function (req, res, next) {

  out = moltin.get_cart()
  out.then(function(product){
    console.log("out is ",product)

    res.json({result: product['data']});
  }).catch(function(res){
    res.status(500);
    res.json({'error': '500'});
  })

});



module.exports = router;
