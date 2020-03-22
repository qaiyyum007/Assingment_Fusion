"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var express_validator_2 = require("express-validator");
var StateSchema = /** @class */ (function () {
    function StateSchema() {
    }
    StateSchema.createState = function () {
        return [
            express_validator_1.check('state')
                .notEmpty().withMessage('state should not be empty'),
        ];
    };
    StateSchema.getState = function () {
        return [
            express_validator_1.check('id')
                .notEmpty().withMessage('_id should not be empty'),
        ];
    };
    StateSchema.updateState = function () {
        return [
            express_validator_1.check('state').trim()
                .notEmpty().withMessage('state should not be empty'),
        ];
    };
    StateSchema.handlesError = function (req, res, next) {
        var errors = express_validator_2.validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        else
            next();
    };
    return StateSchema;
}());
exports.StateSchema = StateSchema;
//# sourceMappingURL=ApiStateSchema.js.map