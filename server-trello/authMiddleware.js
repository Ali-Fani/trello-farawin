'use strict';
const jwt = require('jsonwebtoken');
const check = (req, res, next) => {
    try {
        console.log("im here yohoooo")
        const token = req.cookies.token;
        if (!token) {
            console.error("token not found")
            res.status(401).json({success: false})
            return
        }
        const decoded = jwt.verify(token, "30bil");
        console.log(decoded);
        next()
    } catch (err) {
        res.status(403).json({success:false, error:"invalid token"})
        return
    }
}

module.exports = {isAuth: check}