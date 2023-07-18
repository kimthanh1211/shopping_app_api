'use strict';

const mongodb =require('mongodb');
const client = require('./../db');

const dbName = "shopping_app";
const collectionName = "account";
const database = client.db(dbName);

module.exports ={
    registerAccount:(req,res)=>{
        var json = {
            message:"success",
            data:req.body
        }
        res.json(json);
    },
    checkExistAccount: (req, res) => {
        var reqData = req.body
        async function find() {
          try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            const collection = database.collection(collectionName);
            try {
                const result = await collection.aggregate([{
                   $match: { "id": req.body.id }
                },
                {
                   $count: "totalID"
                }
                ]);

                var json = {
                    message:"success",
                    data:result.totalID
                }
                //res.json(response);
                res.json(json);
              } catch (err) {
                console.error(`Something went wrong trying to find the documents: ${err}\n`);
              }
          } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
          }
        }
        find().catch(console.dir);
        //console.log(res)
    },
    getInfoByToken: (req, res) => {
        var ObjectId = mongodb.ObjectId;
        let idProduct= new ObjectId(req.params.productId);
        let findOneQuery = { _id: idProduct };
        async function find() {
          try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            const collection = database.collection(collectionName);
            try {
                let findOneResult = await collection.findOne(findOneQuery);
                    if (findOneResult === null) {
                        console.log("Couldn't find any recipes that contain "+idProduct+" as an id.\n");
                    } else {
                    console.log(`Found a recipe with "+idProduct+" as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
                }
                res.json(findOneResult);
              } catch (err) {
                console.error(`Something went wrong trying to find the documents: ${err}\n`);
              }
          } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
          }
        }
        find().catch(console.dir);
        //console.log(res)
    },
}
