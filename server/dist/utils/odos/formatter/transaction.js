"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyOdosQuoteResponse = exports.modifyOdosBuildToQuoteResponse = void 0;
const swap_1 = require("../../../enums/providers/swap");
const string_1 = require("../../common/string");
const address_1 = require("../../token/address");
const modifyTokenFormat = (chainId, tokens) => {
    return tokens.reduce((acc, token) => {
        const tokenAddress = (0, address_1.getTokenAddress)(token.tokenAddress);
        const tokenKey = (0, string_1.joinStrings)(chainId, tokenAddress);
        return {
            ...acc,
            [tokenKey]: {
                chainId,
                address: tokenAddress,
                amount: token.amount,
            },
        };
    }, {});
};
const modifyOdosBuildToQuoteResponse = (quoteRes, buildRes) => {
    const chainId = buildRes.transaction.chainId;
    return {
        toAddress: buildRes.transaction.to,
        data: buildRes.transaction.data,
        from: modifyTokenFormat(chainId, buildRes.inputTokens),
        to: modifyTokenFormat(chainId, buildRes.outputTokens),
        provider: swap_1.Providers.Odos,
    };
};
exports.modifyOdosBuildToQuoteResponse = modifyOdosBuildToQuoteResponse;
const modifyOdosQuoteResponse = (quoteRes) => {
    return {
        from: quoteRes.inTokens,
        to: quoteRes.outTokens,
        inAmounts: quoteRes.inAmounts,
        outAmounts: quoteRes.outAmounts,
        pathId: quoteRes.pathId,
        provider: swap_1.Providers.Odos,
    };
};
exports.modifyOdosQuoteResponse = modifyOdosQuoteResponse;
