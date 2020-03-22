"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var express_validator_2 = require("express-validator");
var productSchema = /** @class */ (function () {
    function productSchema() {
    }
    productSchema.createproduct = function () {
        return [
            express_validator_1.check('country')
                .notEmpty().withMessage('country should not be empty'),
            express_validator_1.check('state')
                .notEmpty().withMessage('state should not be empty'),
            express_validator_1.check('country')
                .notEmpty().withMessage('state should not be empty'),
        ];
    };
    productSchema.getdata = function () {
        return [
            express_validator_1.check('id')
                .notEmpty().withMessage('_id should not be empty'),
        ];
    };
    productSchema.updatedata = function () {
        return [
            express_validator_1.check('country')
                .notEmpty().withMessage('Title should not be empty'),
            express_validator_1.check('state')
                .notEmpty().withMessage('Description should not be empty'),
        ];
    };
    productSchema.handlesError = function (req, res, next) {
        var errors = express_validator_2.validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        else
            next();
    };
    return productSchema;
}());
exports.productSchema = productSchema;
//# sourceMappingURL=productschema.js.map