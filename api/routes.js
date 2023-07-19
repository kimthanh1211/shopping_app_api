'use strict';
module.exports = function(app){
    let productCtrl = require('./controllers/products_controller');
    let accountCtrl = require('./controllers/account_controller');
    //to do router
    //begin router product
    app.get('/products',productCtrl.get);
    app.get('/product/:productId',productCtrl.detail);
    app.get('/cart',function(req,res){
        res.status(200).send({id: 1,price:10000,products:[]});
    });
    //end router product

    //begin router account
    app.post('/account/register',accountCtrl.registerAccount);
    //app.post('/account/login',accountCtrl.loginAccount);
    app.post('/account/get_account_by_token',accountCtrl.getAccountByToken);
    //end router account

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