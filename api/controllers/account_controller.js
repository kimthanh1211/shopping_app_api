'use strict';

const crypto = require('crypto');

const mongodb =require('mongodb');
const client = require('./../db');

const dbName = "shopping_app";
const collectionName = "accounts";
const database = client.db(dbName);

module.exports ={
    registerAccount:(req,res)=>{
        async function find() {
          try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            const collection = database.collection(collectionName);
            let json = {
                message:"",
                data: null
            };
            let id = req.body.id
            let password=req.body.password

            if(id.length <6 || id.length >24){
                json.message = "Tên đăng nhập phải từ 6-24 ký tự";
            }
            else if(containsSpecialChars(id)){
                json.message = "Tên đăng nhập không được chứa ký tự đặc biệt";
            }
            else if(password.length <6 || password.length >24){
                json.message = "Mật khẩu phải từ 6-24 ký tự";
            }
            else{
                try {
                    //enscrypt md5 password
                    let pass_md5 = data => crypto.createHash('md5').update(data).digest("hex")

                    const findExist = await collection.count({"account_id": req.body.id});
                    if(findExist==0){
                        //Insert account
                        let dataAccount ={account_id:id,password:pass_md5,date_created : Date(),token:""};
                        const insertResult = await collection.insertOne(dataAccount);
                        json.message="success",
                        json.data=insertResult
                    }
                    else{
                        json.message="Tên đăng nhập đã tồn tại";
                    }

                } catch (err) {
                    console.error(`Something went wrong trying to find the documents: ${err}\n`);
                }
            }
            res.json(json);
          } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
          }
        }
        find().catch(console.dir);
    },
    getInfoByToken: (req, res) => {
        var ObjectId = mongodb.ObjectId;
        let token= new ObjectId(req.params.token);
        let findOneQuery = { token: token };
        async function find() {
          try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            const collection = database.collection(collectionName);
            try {
                let findOneResult = await collection.findOne(findOneQuery);
                    if (findOneResult === null) {
                        console.log("Couldn't find any recipes that contain "+token+" as an id.\n");
                    } else {
                    console.log(`Found a recipe with "+token+" as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
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


function containsSpecialChars(str) {
  return (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(str);
}
