"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var express_validator_2 = require("express-validator");
var CountrySchema = /** @class */ (function () {
    function CountrySchema() {
    }
    CountrySchema.createCountry = function () {
        return [
            express_validator_1.check('country')
                .notEmpty().withMessage('country should not be empty'),
        ];
    };
    CountrySchema.getCountry = function () {
        return [
            express_validator_1.check('id')
                .notEmpty().withMessage('_id should not be empty'),
        ];
    };
    CountrySchema.updateCountry = function () {
        return [
            express_validator_1.check('country').trim()
                .notEmpty().withMessage('country should not be empty'),
        ];
    };
    CountrySchema.handlesError = function (req, res, next) {
        var errors = express_validator_2.validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        else
            next();
    };
    return CountrySchema;
}());
exports.CountrySchema = CountrySchema;
//# sourceMappingURL=ApiCountrySchema.js.map