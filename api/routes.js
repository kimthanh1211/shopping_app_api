'use strict';
module.exports = function(app){
    //let productCtrl = require('./controllers/ProductsController');
    //to do router
    app.get('/products',function(req,res){
        res.status(404).send({url: req.originalUrl + ' not found???'});
    });
    //app.get('/products',productCtrl.get);
    //app.get('/product/:productId',productCtrl.detail)
    //app.router('/products')
        //.get(productCtrl.get)
        //.post(productCtrl.store);
    /*
    app.router('/product/:productId')
        .get(productCtrl.detail)
        .put(productCtrl.update)
        .delete(productCtrl.detail);
    */

}