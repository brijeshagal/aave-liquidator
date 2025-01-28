"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const viem_1 = require("viem");
const user_1 = __importDefault(require("./schema/user"));
const swagger_1 = require("./swagger");
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => {
    console.log("✅ MongoDB Connected");
})
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
const UserData = mongoose_1.default.model("UserDetails", user_1.default);
// Load the Swagger JSON file
const swaggerDocument = JSON.parse(fs_1.default.readFileSync("../swagger.json", "utf8"));
// Serve Swagger UI
app.use("/api-docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swaggerDocument));
app.get("/getUserAddresses", async (req, res) => {
    try {
        const users = await UserData.find({}, "address");
        const userAddresses = users.map((user) => user.address);
        res.json(userAddresses);
    }
    catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});
app.get("/userData/:address", async (req, res) => {
    try {
        const { address } = req.params;
        const userAddress = (0, viem_1.getAddress)(address);
        const userData = await UserData.findOne({ address: userAddress });
        if (!userData) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(userData);
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Server Error" });
    }
});
app.get("/userData", async (_, res) => {
    try {
        const allUsers = await UserData.find({});
        res.json(allUsers);
    }
    catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});
const PORT = process.env.APP_PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server Url: http://localhost:${PORT}`);
});
