'use strict';
const encryption = require('./../../lib/encryption');
const mongodb =require('mongodb');
const client = require('./../db');
const dbName = "shopping_app";
const collectionName = "cosoluutru";
const database = client.db(dbName);

module.exports ={
    //begin post data
    ///fnPost1 insert data
    addCoSoLuuTru:(req,res)=>{
        async function find() {
            let json = {
                message:"",
                data: null
            };
            {
                try {
                    let jsonData =[
                    {
                        ID:1,
                        ParentID:null,
                        CreatedDate:null,
                        CreatedMembershipID:null,
                        LastUpdatedDate:null,
                        LastUpdatedMembershipID:null,
                        RowVersion:null,
                        SortOrder:null,
                        Active:null,
                        Name:null,
                        Code:null,
                        Note:null,
                    },
                    {
                        ID:2,
                        ParentID:null,
                        CreatedDate:null,
                        CreatedMembershipID:null,
                        LastUpdatedDate:null,
                        LastUpdatedMembershipID:null,
                        RowVersion:null,
                        SortOrder:null,
                        Active:null,
                        Name:null,
                        Code:null,
                        Note:null,
                    },

                    ];
                    let insertResult = await collection.insertMany(jsonData);
                    console.log(`insertResult cosoluutru:${insertResult}\n`);
                    //check insert success
                    if(insertResult.acknowledged && insertResult.insertedId !==null){
                        json.message="success";
                        let accountData = await collection.find({});
                        json.data=accountData;
                    }else json.message="Insert error";
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
    getAllCoSoLuuTru:(req,res)=>{
        async function find() {
            let json = {
                message:"",
                data: null
            };
            {
                try {
                    // Connect the client to the server	(optional starting in v4.7)
                    await client.connect();
                    let collection = database.collection(collectionName);
                    let findQuery = { };
                    let cursor = await collection.find(findQuery).sort({ name: -1 });// 1:asc, -1:desc
                    let response=[];
                    //foreach to add response data
                    await cursor.forEach(result => {
                       response.push(result);
                    });
                    json = {
                       message:"success",
                       data:response
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
