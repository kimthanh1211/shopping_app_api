'use strict';
module.exports = function(app){
    let productCtrl = require('./controllers/products_controller');
    let accountCtrl = require('./controllers/account_controller');
    let cartCtrl = require('./controllers/cart_controller');
    let otpCtrl = require('./controllers/otp_controller');
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
    app.post('/cart',cartCtrl.getCart);
    app.post('/cart/add',cartCtrl.addCart);
    app.post('/cart/update',cartCtrl.updateCart);
    app.post('/cart/confirm',cartCtrl.confirmCart);
    app.post('/order/history',cartCtrl.getOrders);
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
    // otp telegram
    app.router('/getotp/:phoneNumber&:chatIdTele')
            .get(optCtrl.sendOtp)
    */
}