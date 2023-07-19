'use strict';

const encryption = require('./../../lib/encryption');

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
            let email = req.body.email
            let password=req.body.password
            let name=req.body.name
            let phone=req.body.phone
            let address=req.body.address
            if(email == undefined || email == null || email ==""){
                json.message = "Email không được bỏ trống";
            }
            else if(password == undefined || password == null || password ==""){
                json.message = "Mật khẩu không được bỏ trống";
            }
            else if(name == undefined || name == null || name ==""){
                json.message = "Họ tên không được bỏ trống";
            }
            else if(phone == undefined || phone == null || phone ==""){
                json.message = "Số điện thoại không được bỏ trống";
            }
            else if(address == undefined || address == null || address ==""){
                json.message = "Địa chỉ không được bỏ trống";
            }
            else if(!validateEmail(email)){
                json.message = "Email sai định dạng";
            }
            else if(password.length <6 || password.length >24){
                json.message = "Mật khẩu phải từ 6-24 ký tự";
            }
            else if(!validatePhone(phone)){
                json.message = "Số điện thoại sai định dạng";
            }
            else{
                try {
                    //create token
                    let token = new mongodb.ObjectId().toString();
                    const findExist = await collection.count({"account_id": req.body.id});
                    if(findExist==0){
                        //Insert account
                        let dataAccount ={
                            email:email
                            ,password:encryption.encryptMd5(password)
                            ,name:name
                            ,phone:phone
                            ,address:address
                            ,date_created : Date()
                            ,token:encryption.encryptMd5(token)};
                        const insertResult = await collection.insertOne(dataAccount);
                        if(insertResult.acknowledged && insertResult.insertedId !==null){
                            json.message="success";
                            let accountData = await collection.findOne({_id : insertResult.insertedId});
                            json.data=accountData;

                        }else json.message="Tạo tài khoản thất bại";
                    }
                    else{
                        json.message="Email đăng ký đã tồn tại";
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
    loginAccount: (req, res) => {
        async function find() {
           let json = {
              message:"",
              data: null
           };
           let email = req.body.email
           let password=req.body.password
           if(email == undefined || email == null || email ==""){
              json.message = "Email không được bỏ trống";
           }
           else if(password == undefined || password == null || password ==""){
              json.message = "Mật khẩu không được bỏ trống";
           }
           else if(!validateEmail(email)){
              json.message = "Email sai định dạng";
           }
           else{
               let findOneQuery = { email: email,password:encryption.encryptMd5(password) };
              //console.log(res)
              try {
                  // Connect the client to the server	(optional starting in v4.7)
                  await client.connect();
                  const collection = database.collection(collectionName);
                  try {
                      let findOneResult = await collection.findOne(findOneQuery);
                      if (findOneResult === null) {
                      console.log("Couldn't find any recipes that contain "+token+" as an id.\n");
                      json.message:"Không tìm thấy tài khoản";
                      } else {
                          console.log(`Found a recipe with ${token} as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
                          json.message:"success";
                          json.data: findOneResult;
                      }
                  } catch (err) {
                        console.error(`Something went wrong trying to find the documents: ${err}\n`);
                 }
                 res.json(json);
              } finally {
                  // Ensures that the client will close when you finish/error
                  await client.close();
              }
           }

        }
        find().catch(console.dir);
    },
    getAccountByToken: (req, res) => {
            let token= req.body.token;
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
                        res.json({
                            message:"Không tìm thấy tài khoản",
                            data: null
                        });
                    } else {
                        console.log(`Found a recipe with ${token} as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
                        res.json({
                            message:"success",
                            data: findOneResult
                        });
                    }

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
function validateEmail(str) {
  return (/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/).test(str);
}
function validatePhone(str) {
  return (/^\d{10}$/).test(str);
}
