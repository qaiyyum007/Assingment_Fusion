"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var express_validator_2 = require("express-validator");
var productSchema = /** @class */ (function () {
    function productSchema() {
    }
    productSchema.createproduct = function () {
        return [
            express_validator_1.check('item')
                .notEmpty().withMessage('Title should not be empty'),
            express_validator_1.check('price')
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
//# sourceMappingURL=product.schema.js.map