'use strict';
module.exports = function(app){
    let productCtrl = require('./controllers/products_controller');
    //to do router
    app.get('/products',productCtrl.get);
    app.get('/product/:productId',productCtrl.detail);
    app.get('/cart',function(req,res){
        res.status(200).send({id: 1,price:10000,products:20000});
    });

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