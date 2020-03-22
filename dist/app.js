"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
exports.app = app;
var jwt = require("jsonwebtoken");
var ApiCityRouter_1 = require("./ApiCityRouter");
var ApiLoginSignup_1 = require("./ApiLoginSignup");
var ApiCountryRouter_1 = require("./ApiCountryRouter");
var ApiStateRouter_1 = require("./ApiStateRouter");
app.use(express.json());
app.listen(7777);
console.log("server start");
app.all("/api/*", function (req, res, next) {
    try {
        var token = req.headers["token"];
        console.log("token " + token);
        if (!token)
            res.status(403).send();
        else {
            jwt.verify(token, "secretKey", function (err, decoded) {
                if (!err)
                    next();
                else
                    res.status(500).send('token is not found');
            });
        }
    }
    catch (err) { }
});
app.use('/', new ApiLoginSignup_1.ApiLoginSignup().dataRouter);
app.use("/api/v1", new ApiCityRouter_1.Product().citytype);
app.use("/api/v1", new ApiCountryRouter_1.Country().countrytype);
app.use("/api/v1", new ApiStateRouter_1.State().statetype);
//# sourceMappingURL=app.js.map