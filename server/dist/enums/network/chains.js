"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkCategory = exports.ChainIds = void 0;
var ChainIds;
(function (ChainIds) {
    ChainIds[ChainIds["MAINNET"] = 1] = "MAINNET";
    ChainIds[ChainIds["OPTIMISM"] = 10] = "OPTIMISM";
    ChainIds[ChainIds["CRONOS"] = 25] = "CRONOS";
    ChainIds[ChainIds["POLYGON"] = 137] = "POLYGON";
    ChainIds[ChainIds["FANTOM"] = 250] = "FANTOM";
    ChainIds[ChainIds["GNOSIS"] = 100] = "GNOSIS";
    ChainIds[ChainIds["BSC"] = 56] = "BSC";
    ChainIds[ChainIds["ARBITRUM_ONE"] = 42161] = "ARBITRUM_ONE";
    ChainIds[ChainIds["AVALANCHE"] = 43114] = "AVALANCHE";
    ChainIds[ChainIds["CELO"] = 42220] = "CELO";
    ChainIds[ChainIds["MOONRIVER"] = 1285] = "MOONRIVER";
    ChainIds[ChainIds["MOONBEAM"] = 1284] = "MOONBEAM";
    ChainIds[ChainIds["HARMONY"] = 1666600000] = "HARMONY";
    ChainIds[ChainIds["BOBA"] = 288] = "BOBA";
    ChainIds[ChainIds["AURORA"] = 1313161554] = "AURORA";
    ChainIds[ChainIds["METIS"] = 1088] = "METIS";
    ChainIds[ChainIds["SEPOLIA"] = 11155111] = "SEPOLIA";
})(ChainIds || (exports.ChainIds = ChainIds = {}));
var NetworkCategory;
(function (NetworkCategory) {
    NetworkCategory[NetworkCategory["DEFAULT"] = 0] = "DEFAULT";
    NetworkCategory[NetworkCategory["CUSTOM"] = 1] = "CUSTOM";
})(NetworkCategory || (exports.NetworkCategory = NetworkCategory = {}));
