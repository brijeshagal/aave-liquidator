"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuotes = void 0;
const OdosProvider_1 = __importDefault(require("./odos/OdosProvider"));
const getQuotes = async (req, res) => {
    try {
        const quoteRequest = req.body;
        const odosProvider = new OdosProvider_1.default();
        const quotes = await odosProvider.getQuoteRate(quoteRequest);
        if (quotes) {
            const quotesAndBuildRes = await odosProvider.getTransactionData({
                quoteRes: quotes,
                sender: quoteRequest.sender,
            });
            res.json(quotesAndBuildRes);
        }
        else {
            console.error("Error in Quote");
            res.status(400).json({ error: "Failed" });
        }
    }
    catch (e) {
        console.error("Error fetching quote:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getQuotes = getQuotes;
