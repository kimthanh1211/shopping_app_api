'use strict';

const mongodb =require('mongodb');
const client = require('./../db');

const dbName = "shopping_app";
const collectionName = "products";
const database = client.db(dbName);

module.exports ={
    get: (req, res) => {
        let findQuery = { name: { $regex: /Online/ } };
        async function find() {
            try {
                // Connect the client to the server	(optional starting in v4.7)
                await client.connect();
                let collection = database.collection(collectionName);
                let cursor = await collection.find(findQuery).sort({ name: -1 });// 1:asc, -1:desc
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
    detail: (req, res) => {
        let idProduct= new mongodb.ObjectId(req.params.productId);
        let findOneQuery = { _id: idProduct };
        async function find() {
            try {
                // Connect the client to the server	(optional starting in v4.7)
                await client.connect();
                let collection = database.collection(collectionName);
                let findOneResult = await collection.findOne(findOneQuery);
                if (findOneResult === null) {
                    console.log("Couldn't find any recipes that contain "+idProduct+" as an id.\n");
                    res.json({
                        message:"Không tìm thấy sản phẩm",
                        data:null
                    });
                } else {
                console.log(`Found a recipe with ${idProduct} as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
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
}


