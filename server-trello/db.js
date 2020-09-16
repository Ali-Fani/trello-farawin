"use strict"
const { MongoClient } = require("mongodb")
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri, { useUnifiedTopology: true })

let db
async function initDB() {
    try {
        await client.connect()
        const newDB = client.db("farawin")
        return newDB
        //2: db = client.db("farawin")
    } catch (error) {
        console.log(error)
    }
}

async function getInstance() {
    if (!db) {
        db = await initDB()
        //2: await initDB()
    }
    return db
}
module.exports = { getInstance }