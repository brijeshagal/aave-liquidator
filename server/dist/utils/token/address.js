"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenAddress = void 0;
const native_1 = require("../../constants/address/native");
const getTokenAddress = (address) => {
    if (address.toLowerCase() === native_1.eFormatNativeCurrencyLowerCase) {
        return native_1.nativeCurrency;
    }
    return address.toLowerCase();
};
exports.getTokenAddress = getTokenAddress;
