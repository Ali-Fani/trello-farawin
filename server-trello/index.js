"use strict"
const app = require("express")()
app.use(require("body-parser").json())
app.use(require("./route"))
console.log("app listen on 8090")
app.listen(8090)