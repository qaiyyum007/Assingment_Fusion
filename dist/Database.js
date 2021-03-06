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
var mongodb_1 = require("mongodb");
var Database = /** @class */ (function () {
    function Database() {
        var url = "mongodb://localhost:27017";
        this.client = new mongodb_1.MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = 'product';
    }
    Database.prototype.readOne = function (readOne) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, db, collection, docs, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        conn = _a.sent();
                        db = conn.db(this.db);
                        collection = db.collection(readOne.collection);
                        return [4 /*yield*/, collection.findOne(readOne.projection, readOne.criteria)];
                    case 2:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.read = function (readParams) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, db, collection, docs, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        conn = _a.sent();
                        db = conn.db(this.db);
                        collection = db.collection(readParams.collection);
                        return [4 /*yield*/, collection.find(readParams.criteria, readParams.projection).toArray()];
                    case 2:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                    case 3:
                        err_2 = _a.sent();
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.readWithSkipAndLimit = function (readWith) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, db, collection, docs, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        conn = _a.sent();
                        db = conn.db(this.db);
                        collection = db.collection(readWith.collection);
                        return [4 /*yield*/, collection.find(readWith.criteria, readWith.projection).skip(readWith.skip).limit(readWith.limit).sort({ "columnName": -1 }).toArray()];
                    case 2:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                    case 3:
                        err_3 = _a.sent();
                        throw err_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.createOne = function (createOneParams) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, db, collection, docs, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        conn = _a.sent();
                        db = conn.db(this.db);
                        collection = db.collection(createOneParams.collection);
                        return [4 /*yield*/, collection.insertOne(createOneParams.data, createOneParams.criteria)];
                    case 2:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                    case 3:
                        err_4 = _a.sent();
                        throw err_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.updateOne = function (updateOneParams) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, db, collection, docs, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        conn = _a.sent();
                        db = conn.db(this.db);
                        collection = db.collection(updateOneParams.collection);
                        return [4 /*yield*/, collection.updateOne(updateOneParams.criteria, updateOneParams.data)];
                    case 2:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                    case 3:
                        err_5 = _a.sent();
                        throw err_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.deleteOne = function (deleteOneParams) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, db, collection, docs, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        conn = _a.sent();
                        db = conn.db(this.db);
                        collection = db.collection(deleteOneParams.collection);
                        return [4 /*yield*/, collection.deleteOne(deleteOneParams.criteria)];
                    case 2:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                    case 3:
                        err_6 = _a.sent();
                        throw err_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=Database.js.map