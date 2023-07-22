'use strict';
const encryption = require('./../../lib/encryption');
const mongodb =require('mongodb');
const client = require('./../db');
const dbName = "shopping_app";
const collectionName = "cart";
const database = client.db(dbName);

module.exports ={
    addCart:(req,res)=>{
        async function find() {
            let json = {
                message:"",
                data: null
            };
            let accountID  = new mongodb.ObjectId(req.body.account_id)
                ,productID = new mongodb.ObjectId(req.body.product_id);
            if(accountID == undefined || accountID == null || accountID ==""){
                json.message="Data null";
            }
            else if(productID == undefined || productID == null || productID ==""){
                json.message="Data null";
            }
            else{
                try {
                    // Connect the client to the server	(optional starting in v4.7)
                    await client.connect();
                    let collection = database.collection(collectionName);

                    let findOneQuery = { account_id: accountID };
                    let getCart = await collection.findOne(findOneQuery);
                    let listProduct = [],
                        totalPrice = 0,
                        productIsExist = false;
                    if(getCart.products != undefined && getCart.products != null && getCart.products.length> 0){
                        await getCart.products.forEach(product => {
                            if(product._id ==productID ){
                                product.quantity +=1;
                                productIsExist = true;
                            }
                            totalPrice += product.price * product.quantity;
                            listProduct.push(product);
                        });

                    }
                    if(!productIsExist){
                         let getProductNew = await database.collection('products').findOne({_id: productID});
                         if(getProductNew !==null){
                             listProduct.push(getProductNew);
                             totalPrice+=getProductNew.price;
                         }
                    }

                    let updateDoc = { $set: { products: listProduct,price:totalPrice } };
                    let updateOptions = {
                        // return new data update
                        returnOriginal: false
                        ,returnDocument : "after"
                        // return new data update
                        //upsert: true, // insert new record when not exist
                    };
                    let updateResult = await collection.findOneAndUpdate(
                        findOneQuery,
                        updateDoc,
                        updateOptions,
                    );
                    json.message="success";
                    //{ "message": "success", "data": { "lastErrorObject": { "n": 1, "updatedExisting": true }, "value": { "_id": "64bb79fe56de9874831c74b9", "products": [ { "_id": "64b1666492068ee9e390f7dd", "name": "1-A Chảy - Mì Sủi Cảo & Cơm Chiên Gà Xối Mỡ - Shop Online", "address": "58/11 Nguyễn Văn Săng, P. Tân Sơn Nhì, Tân Phú, TP. HCM", "price": 30000, "img": "assets/images/banner.jpg", "quantity": 1, "gallery": [ "assets/images/img1.jpg", "assets/images/img2.jpg", "assets/images/img3.jpg" ], "date_created": "Fri Jul 14 2023 22:14:44 GMT+0700 (Indochina Time)", "date_updated": null } ], "account_id": "64bb79fe56de9874831c74b8", "account_name": "Vo Kim Thnh", "price": 30000 }, "ok": 1, "$clusterTime": { "clusterTime": { "$timestamp": "7258549293504528396" }, "signature": { "hash": "EC2kKAKWWRcrkbCTE2spuKBm7qs=", "keyId": { "low": 21, "high": 1676560549, "unsigned": false } } }, "operationTime": { "$timestamp": "7258549293504528396" } } }
                    json.data=updateResult.value;
                } catch (err) {
                    json.message="err" + err;
                }
                finally {
                    // Ensures that the client will close when you finish/error
                    await client.close();
                }
            }
            res.json(json);
        }
        find().catch(console.dir);
    },


    ///fnPost1 insert data
    confirmCart:(req,res)=>{
        async function find() {
                let json = {
                    message:"",
                    data: null
                };
                let accountID  = new mongodb.ObjectId(req.body.account_id);
                if(dataCheck == undefined || dataCheck == null || dataCheck ==""){
                    json.message="Data null";
                }
                else{
                    try {
                        // Connect the client to the server	(optional starting in v4.7)
                        await client.connect();
                        let collection = database.collection(collectionName);
                        {
                            //Insert data
                            let getCart = await collection.findOne({account_id:accountID});
                            let insertResult = await collection.insertOne({
                                products:getCart.products,
                                status:1,
                                date_created:Date(),
                                account_id:getCart.account_id,
                                account_name:getCart.account_name
                            });
                            }
                            //check insert success
                            if(insertResult.acknowledged && insertResult.insertedId !==null){
                                json.message="success";
                                let accountData = await collection.findOne({_id : insertResult.insertedId});
                                json.data=accountData;
                            }else json.message="Insert error";
                        }
                    catch (err) {
                        json.message="err" + err;
                    }
                    finally {
                        // Ensures that the client will close when you finish/error
                        await client.close();
                    }
                }
                res.json(json);
            }
        find().catch(console.dir);
    },
    ///fn get cart data
    getCart:(req,res)=>{
        async function find() {
            let json = {
                message:"",
                data: null
            };
            let accountID  = new mongodb.ObjectId(req.body.account_id);
            if(accountID == undefined || accountID == null || accountID ==""){
                json.message="Data null";
            }
            else{
                try {
                    // Connect the client to the server	(optional starting in v4.7)
                    await client.connect();
                    let collection = database.collection(collectionName);
                    //begin find exist option
                    let findData = await collection.findOne({account_id:accountID});// 1:asc, -1:desc
                    json.message ="success",
                    json.data=findData;
                } catch (err) {
                    json.message="err" + err;
                }
                finally {
                    // Ensures that the client will close when you finish/error
                    await client.close();
                }
            }
            res.json(json);
        }
        find().catch(console.dir);
    },
    ///fn get orders data
    getOrders:(req,res)=>{
        async function find() {
            let json = {
                message:"",
                data: null
            };
            let accountID  = new mongodb.ObjectId(req.body.account_id);
            if(accountID == undefined || accountID == null || accountID ==""){
                json.message="Data null";
            }
            else{
                try {
                    // Connect the client to the server	(optional starting in v4.7)
                    await client.connect();
                    let collection = database.collection('orders');
                    //begin find exist option
                    let cursor = await collection.find({account_id:accountID}).sort({ name: -1 });// 1:asc, -1:desc
                    let response=[];
                    await cursor.forEach(result => {
                        response.push(result);
                    });
                    json.message = "success"
                    json.data=response
                } catch (err) {
                    json.message="err" + err;
                }
                finally {
                    // Ensures that the client will close when you finish/error
                    await client.close();
                }
            }
            res.json(json);
        }
        find().catch(console.dir);
    },
    //end get data
}