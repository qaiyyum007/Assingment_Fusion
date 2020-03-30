"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var expressRouter = express.Router();
var Database_1 = require("./Database");
var ApiLoginSchema_1 = require("./ApiLoginSchema");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var mongodb_1 = require("mongodb");
var ApiLoginSignup = /** @class */ (function () {
    function ApiLoginSignup() {
        var _this = this;
        this.dataRouter = expressRouter;
        this.dataRouter.post('/signup', ApiLoginSchema_1.Validator.signupSchema(), ApiLoginSchema_1.Validator.handleError, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var salt, _a, docs, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 1:
                        salt = _b.sent();
                        _a = req.body;
                        return [4 /*yield*/, bcrypt.hashSync(req.body.password, 10)];
                    case 2:
                        _a.password = _b.sent();
                        return [4 /*yield*/, new Database_1.Database().createOne({
                                collection: 'Admindb',
                                data: req.body
                            })];
                    case 3:
                        docs = _b.sent();
                        res.status(200).send(docs);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        res.status(500).send(err_1.Message + "-" + err_1.stack);
                        console.log(err_1.Message + "-" + err_1.stack);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        this.dataRouter.get("/exitsEmail", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var docs, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Database_1.Database().read({
                                collection: "Admindb",
                                criteria: { email: req.params.email },
                                projection: {},
                            })];
                    case 1:
                        docs = _a.sent();
                        res.status(200).send(docs);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).send(err_2.message + "-" + err_2.stack);
                        console.log(err_2.message + "-" + err_2.stack);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.dataRouter.post("/login", ApiLoginSchema_1.Validator.loginSchema(), ApiLoginSchema_1.Validator.handleError, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var docs, token, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Database_1.Database().readOne({
                                collection: "Admindb",
                                criteria: { email: req.body.email, password: req.body.password },
                                projection: {}
                            })];
                    case 1:
                        docs = _a.sent();
                        if (docs) {
                            token = jwt.sign({ "email": req.body.email }, "secretKey");
                            res.status(200).send(token);
                            console.log(token);
                        }
                        else
                            res.status(404).send("Incorrect username/password.");
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.status(500).send(err_3.message + "-" + err_3.stack);
                        return [3 /*break*/, 3];
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        }); });
        this.dataRouter.post("/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var docs, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Database_1.Database().createOne({
                                collection: "Admindb",
                                criteria: { email: req.body.email },
                                projection: {}
                            })];
                    case 1:
                        docs = _a.sent();
                        if (docs) {
                            bcrypt.compare("req.body.password", docs.password).
                                then(function (match) {
                                var token = jwt.sign({ "email": req.body.email }, "secretKey");
                                res.status(200).send(token);
                                console.log(token);
                            });
                            res.status(200).send("password matched login sucessful ");
                        }
                        else
                            res.status(404).send("Incorrect password.");
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(500).send(err_4.message + "-" + err_4.stack);
                        return [3 /*break*/, 3];
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        }); });
        this.dataRouter.get("/login", ApiLoginSchema_1.Validator.loginSchema(), ApiLoginSchema_1.Validator.handleError, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var docs, token, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Database_1.Database().readOne({
                                collection: "Admindb",
                                criteria: {},
                                projection: {}
                            })];
                    case 1:
                        docs = _a.sent();
                        if (docs) {
                            token = jwt.sign({ "email": req.body.email }, "secretKey");
                            res.status(200).send(token);
                            console.log(token);
                        }
                        else {
                            res.status(404).send("Incorrect username/password.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        res.status(500).send(err_5.message + "-" + err_5.stack);
                        return [3 /*break*/, 3];
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        }); });
        this.dataRouter.put("/change_password", ApiLoginSchema_1.Validator.ChangePasswordSchema(), ApiLoginSchema_1.Validator.handleError, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var dat, updateOneParams, docs, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dat = { $set: {
                                'password': bcrypt.hashSync(req.body.password, req.app.get('saltRounds')),
                                'updated_at': new Date()
                            }
                        };
                        updateOneParams = {
                            collection: "Admindb",
                            criteria: { "_id": new mongodb_1.ObjectID(req.body.id) },
                            data: dat
                        };
                        return [4 /*yield*/, new Database_1.Database().updateOne(updateOneParams)];
                    case 1:
                        docs = _a.sent();
                        res.send(docs);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.status(500).send(e_1.message + "-" + e_1.stack);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }
    return ApiLoginSignup;
}());
exports.ApiLoginSignup = ApiLoginSignup;
//# sourceMappingURL=ApiLoginSignup.js.map