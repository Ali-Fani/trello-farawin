"use strict";
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });

let db;
async function initDB() {
  try {
    await client.connect();
    const newDB = client.db("farawin");
    return newDB;
    //2: db = client.db("farawin")
  } catch (error) {
    console.log(error);
  }
}

async function getInstance() {
  if (!db) {
    db = await initDB();
    //2: await initDB()
  }
  return db;
}

async function insertOne(collection, dataToInsert) {
  const db = await getInstance();
  const res = await db.collection(collection).insertOne(dataToInsert);
  return res;
}

async function updateOne(collection, dataToUpdate, condition) {
  const db = await getInstance();
  const res = await db
    .collection(collection)
    .updateOne(condition, { $set: dataToUpdate });
  return res;
}

async function findOne(collection, condition) {
  const db = await getInstance();
  const res = await db.collection(collection).findOne(condition);
  return res;
}

async function deleteOne(collection, condition) {
  const db = await getInstance();
  const res = await db.collection(collection).deleteOne(condition);
  return res;
}

module.exports = { getInstance, insertOne, updateOne, findOne, deleteOne };
