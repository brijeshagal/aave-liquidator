"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quote_1 = require("../controller/swap/quote");
const quotesRouter = (0, express_1.Router)();
quotesRouter.post("/quote", quote_1.getQuotes);
exports.default = quotesRouter;
