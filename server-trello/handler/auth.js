
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
        res.json({ success: true, token: user.token })
    } catch (err) {
        console.log(err)
    }
}
const register = async (req,res) => {
    // به زودی در این مکان کد نصب خواهد شد
}

module.exports = {auth, register} 