"use strict";
const express = require("express");
var bodyParser = require("body-parser");
// const router = require("./router")
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri,{ useUnifiedTopology: true });
const app = express();
app.use(bodyParser.json());
// app.use(router)
app.post("/login",async (req, res) => {
  try {
    await client.connect();
    const database = client.db("farawin");
    const users = database.collection("users");
    const user = await users.findOne({ username: req.body.username, pass: req.body.pass });
    if (!user){
        res.status(403).json({ success: false });
        return
    }
    res.json({ success: true });
  }catch(err){
    console.log(err)
  } finally {
    await client.close();
  }
});
app.listen(8090);
