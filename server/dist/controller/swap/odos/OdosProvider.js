"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const viem_1 = require("viem");
const transaction_1 = require("../../../utils/odos/formatter/transaction");
class OdosProvider {
    quoteUrl = "https://api.odos.xyz/sor/quote/v2";
    assembleUrl = "https://api.odos.xyz/sor/assemble";
    async getQuoteRate(args) {
        try {
            const { amount, from, recipient, slippage, to, sender } = args;
            const quoteRequestBody = {
                chainId: from.assets.chainId,
                inputTokens: [
                    {
                        tokenAddress: (0, viem_1.checksumAddress)(from.assets.address),
                        amount,
                    },
                ],
                outputTokens: [
                    {
                        tokenAddress: (0, viem_1.checksumAddress)(to.assets.address),
                        proportion: 1,
                    },
                ],
                userAddr: (0, viem_1.checksumAddress)(sender),
                slippageLimitPercent: slippage,
                referralCode: 0,
                disableRFQs: true,
                compact: true,
            };
            const quoteResponse = await axios_1.default.post(this.quoteUrl, quoteRequestBody, {
                headers: { "Content-Type": "application/json" },
            });
            if (quoteResponse.status === 200) {
                const quote = quoteResponse.data;
                const modifiedQuote = (0, transaction_1.modifyOdosQuoteResponse)(quote);
                return modifiedQuote;
            }
            else {
                console.error("Error in Quote:", quoteResponse.statusText);
                return;
            }
        }
        catch (e) {
            console.error({ e });
            return;
        }
    }
    async getTransactionData({ sender, quoteRes, }) {
        try {
            const assembleRequestBody = {
                userAddr: (0, viem_1.checksumAddress)(sender),
                pathId: quoteRes.pathId, // Replace with the pathId from quote response in step 1
                simulate: false, // this can be set to true if the user isn't doing their own estimate gas call for the transaction
            };
            const assembledResponse = await axios_1.default.post(this.assembleUrl, assembleRequestBody, {
                headers: { "Content-Type": "application/json" },
            });
            const assembledTransaction = assembledResponse.data;
            const buildData = (0, transaction_1.modifyOdosBuildToQuoteResponse)(quoteRes, assembledTransaction);
            return buildData;
        }
        catch (e) {
            console.log({ e });
            return;
        }
    }
}
exports.default = OdosProvider;
