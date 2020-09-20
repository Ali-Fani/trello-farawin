"use strict"
const app = require("express")()
app.use(require("body-parser").json())
app.use(require('cookie-parser')());
app.use(require("./route"))
console.log("app listen on 8090")
const s = app.listen(80)
s.keepAliveTimeout = 5;