"use strict";
const app = require("express")();
app.use(require("body-parser").json());
app.use(require("cookie-parser")());
app.use('/api', require("./route"));
console.log("app listen on 8090");
app.listen(8090);
