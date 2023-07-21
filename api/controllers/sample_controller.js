'use strict';

const encryption = require('./../../lib/encryption');

const mongodb =require('mongodb');
const client = require('./../db');

const dbName = "";
const collectionName = "";
const database = client.db(dbName);

module.exports ={
    //begin post data
    ///fnPost1 insert data
    fnPost1:(req,res)=>{
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
                    //begin option check exist
                    const findExist = await collection.count({param1: ""});
                    if(findExist==0)
                    //end  option check exist
                    {
                        //Insert data
                        let data ={param1:"",param2:""};
                        const insertResult = await collection.insertOne(data);
                        //check insert success
                        if(insertResult.acknowledged && insertResult.insertedId !==null){
                            json.message="success";
                            let accountData = await collection.findOne({_id : insertResult.insertedId});
                            json.data=accountData;
                        }else json.message="Insert error";
                    }
                    //begin option check exist
                    else{
                        json.message="Has exist record";
                    }
                    //end option check exist

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
    },///fnPost1 insert data
    ///fnPost1 update data
    fnPost2:(req,res)=>{
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
    fnPost3:(req,res)=>{
        async function find() {
            let json = {
                message:"",
                data: null
            };
            let dataCheck1 =req.body.data_check;
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
    //begin get data
    //fnGet1 find one
    fnGet1: (req, res) => {
        let oId= new mongodb.ObjectId(req.params.id_check); //parse id is mongodb.ObjectId()
        let findOneQuery = { _id: oId };
        async function find() {
            try {
                // Connect the client to the server	(optional starting in v4.7)
                await client.connect();
                const collection = database.collection(collectionName);
                let findOneResult = await collection.findOne(findOneQuery);
                if (findOneResult === null) {
                    res.json({
                        message:"Data not found",
                        data:null
                    });
                } else {
                    res.json({
                        message:"success",
                        data:findOneResult
                    });
                }

              } catch (err) {
                res.json({
                    message:"error" + err,
                    data:null
                });
                console.error(`Something went wrong trying to find the documents: ${err}\n`);
              }
              finally {
                  // Ensures that the client will close when you finish/error
                  await client.close();
              }

        }
        find().catch(console.dir);
        //console.log(res)
    },
    //fnGet2 find list data
    fnGet2: (req, res) => {
        async function find() {
                try {
                    // Connect the client to the server	(optional starting in v4.7)
                    await client.connect();
                    const collection = database.collection(collectionName);
                    let findQuery = { data_check: { $regex: /content check/ } };
                    const cursor = await collection.find(findQuery).sort({ name: -1 });// 1:asc, -1:desc
                    let response=[];
                    //foreach to add response data
                    await cursor.forEach(result => {
                      response.push(result);
                    });
                    var json = {
                        message:"success",
                        data:response
                    }
                    //res.json(response);
                    res.json(json);
                  } catch (err) {
                    res.json({
                        message:"error" + err,
                        data:null
                    });
                  }
                  finally {
                       // Ensures that the client will close when you finish/error
                       await client.close();
                  }

            }
            find().catch(console.dir);
        },
    //end get data
}
