'use strict';
module.exports = function(app){
    let productCtrl = require('./controllers/products_controller');
    let accountCtrl = require('./controllers/account_controller');
    //to do router
    //begin router product
    app.get('/products',productCtrl.get);
    app.get('/product/:productId',productCtrl.detail);
    //end router product

    //begin router account
    app.post('/account/register',accountCtrl.registerAccount);
    app.post('/account/login',accountCtrl.loginAccount);
    app.post('/account/get_account_by_token',accountCtrl.getAccountByToken);
    //end router account

    //begin router cart - orders
    app.post('/cart');
    app.post('/cart/update');
    app.post('/cart/confirm');
    app.post('/order/history');
    //end router cart - orders

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