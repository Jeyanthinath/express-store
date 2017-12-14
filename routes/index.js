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

module.exports = router;
