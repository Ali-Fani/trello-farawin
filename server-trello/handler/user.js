'use strict';
const jwt = require('jsonwebtoken');
const { getInstance } = require("../db")

const login = async (req, res) => {
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
        const ok = await generateToken(res, user._id)
        res.json({ success: ok })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
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
        res.status(500).json({ success: false })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            console.error("token not found")
            res.status(401).json({ success: false })
            return
        }
        const decoded = jwt.verify(token, "40bil");
        const ok = await generateToken(res, decoded.id)
        res.json({ success: ok })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}


const check = (req, res) => {
    res.json({success:true})
}


const generateToken = async (res,userID) => {
    const accessToken = jwt.sign({ id: userID }, '30bil',{ expiresIn:"15min" });
    const rToken = jwt.sign({ id: userID }, '40bil', { expiresIn: "10d" });

    const db = await getInstance()
    const users = db.collection("users")
    const ok = await users.updateOne({ _id: userID }, { $set: { refreshToken: rToken }})
    if (!ok){
        res.status(500)
        return false
    }
    res.cookie('access_token', accessToken, { maxAge: 1000 * 60 * 15, httpOnly: true });
    res.cookie('refresh_token', rToken, { maxAge: 3600 * 1000 * 10, httpOnly: true });
    return true
}

module.exports = { login, register, refreshToken, check } 