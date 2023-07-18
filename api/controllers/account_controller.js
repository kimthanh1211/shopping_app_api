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
            data:req.params,
            content:req.body
        }
        res.json(json);
    },
    checkExitst: (req, res) => {
        let findQuery = { name: { $regex: /Online/ } };
        async function find() {
          try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            const collection = database.collection(collectionName);
            try {
                const cursor = await collection.find(findQuery).sort({ name: -1 });// 1:asc, -1:desc
                let response=[];
                await cursor.forEach(result => {
                  //console.log(result._id.toString())
                  //console.log(result);
                  /*var json={
                    statusCode:1,
                    statusMessage:'success',
                    data:result
                  };
                  response.push(json)*/
                  //result.id=result._id.toString();
                  //result['id'] = result['_id'];
                  //delete result['_id'];

                  response.push(result);
                });
                var json = {
                    message:"success",
                    data:response
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
    getInfoBytoken: (req, res) => {
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
