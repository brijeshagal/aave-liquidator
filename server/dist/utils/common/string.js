"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinStrings = joinStrings;
const string_1 = require("../../constants/common/string");
function joinStrings(...inputs) {
    return inputs.join(string_1.JoinDelimiter);
}
