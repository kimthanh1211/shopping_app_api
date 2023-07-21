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
            let dataCheck =req.body.data_check;
            if(dataCheck == undefined || dataCheck == null || dataCheck ==""){
                json.message="Data null";
            }
            else{
                try {
                    // Connect the client to the server	(optional starting in v4.7)
                    await client.connect();
                    const collection = database.collection(collectionName);

                    const findOneQuery = { data_find: {$regex:/content/} };
                    const updateDoc = { $set: { data_update: "content" } };
                    const updateOptions = {
                        // return new data update
                        returnOriginal: false
                        ,returnDocument : "after"
                        // return new data update
                        upsert: true, // insert new record when not exist
                    };
                    const updateResult = await collection.findOneAndUpdate(
                        findOneQuery,
                        updateDoc,
                        updateOptions,
                    );
                    json.message="success";
                    json.data=updateResult;
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
    ///fnPost3 find data
    getCart:(req,res)=>{
        async function find() {
            let json = {
                message:"",
                data: null
            };
            let cart_id =req.body.data_check;
            let dataCheck2 =req.body.data_check;
            if(dataCheck1 == undefined || dataCheck1 == null || dataCheck1 ==""){
                json.message="Data null";
            }
            if(dataCheck2 == undefined || dataCheck2 == null || dataCheck2 ==""){
                json.message="Data null";
            }
            else{
                try {
                    // Connect the client to the server	(optional starting in v4.7)
                    await client.connect();
                    const collection = database.collection(collectionName);
                    //begin find exist option
                    let findExist = await collection.count({"dataCheck1": dataCheck1});
                    if(findExist==0){
                        json.message="dataCheck1 not found";
                    }else
                    //end find exist option
                    {
                        let findOneQuery = {"dataCheck1": dataCheck1,"dataCheck2": dataCheck2};
                        let findOneResult = await collection.findOne(findOneQuery);
                        if (findOneResult === null) {
                            json.message="Wrong dataCheck1 or dataCheck2";
                        } else {
                            json.message="success";
                            json.data= findOneResult;
                        }
                    }
                } catch (err) {
                    json.message="err" + err;
                    console.error(`Something went wrong trying to find the documents: ${err}\n`);
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
    //end post data
}