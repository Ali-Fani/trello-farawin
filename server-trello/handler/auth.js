'use strict';
const jwt = require('jsonwebtoken');
const { getInstance } = require("../db")

const auth = async (req, res) => {
    try {
        if (!req.body.username) {
            res.status(400).json({ success: false, error: "missing username" })
            return
        }
        if (req.body.username.length < 3) {
            res.status(400).json({ success: false, error: "invalid username" })
        }
        if (!req.body.pass || req.body.pass.length < 8) {
            res.status(400).json({ success: false, error: "invalid pass" })
            return
        }
        const db = await getInstance()
        const users = db.collection("users")
        const user = await users.findOne({ username: req.body.username, pass: req.body.pass })
        if (!user) {
            res.status(403).json({ success: false })
            return
        }
        console.log("INFO:", "request ok")

        const refreshToken = jwt.sign({ expireIn: "2021-01-01" }, '40bil');
    
        users.updateOne({ _id: user._id }, { $set: { refreshToken: refreshToken } })

        const accessToken = jwt.sign({ email: user.email, id: user._id, refreshToken: refreshToken }, '30bil');
        res.cookie('token', accessToken, { maxAge: 900000, httpOnly: true });

        res.json({ success: true })
    } catch (err) {
        console.log(err)
    }
}
const register = async (req, res) => {
    try {
        if (!req.body.username) {
            res.status(400).json({ success: false, error: "missing username" })
            return
        }
        if (req.body.username.length < 3) {
            res.status(400).json({ success: false, error: "invalid username" })
        }
        if (!req.body.pass || req.body.pass.length < 8 || !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(req.body.pass)) {
            res.status(400).json({ success: false, error: "invalid pass" })
            return
        }
        const db = await getInstance()
        const users = db.collection("users")
        const ok = await users.insertOne({ username: req.body.username, pass: req.body.pass, email: req.body.email || "" })
        if (!ok) {
            res.status(500).json({ success: false })
            return
        }
        console.log("INFO:", "register ok")
        res.json({ success: true })
    } catch (err) {
        console.log(err)
    }
}

const check = async (req, res) => {
    try {
     res.json({success:true})
    } catch (err) {
        res.status(403).json({success:false, error:"invalid token"})
        console.log(err)
    }
}

module.exports = { auth, register, check } 