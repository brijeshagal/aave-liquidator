"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
// @TODO check if required as EVM might be same but still address is different.
var Address;
(function (Address) {
    Address["EVM"] = "evm";
    Address["SVM"] = "svm";
    Address["ZKSYNC"] = "zkSync";
})(Address || (exports.Address = Address = {}));
