import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import mongoose from "mongoose";
import { getAddress } from "viem";
import userSchema from "./schema/user";
import { swaggerUi } from "./swagger";
import cors from "cors";

const app = express();
dotenv.config();

app.use(helmet());
app.use(express.json());
cors();
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const UserData = mongoose.model("UserDetails", userSchema);

// Load the Swagger JSON file
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf8"));

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});
app.get("/getUserAddresses", async (req, res) => {
  try {
    const users = await UserData.find({}, "address");
    const userAddresses = users.map((user) => user.address);
    res.json(userAddresses);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/userData/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const userAddress = getAddress(address);

    const userData = await UserData.findOne({ address: userAddress });
    if (!userData) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/userData", async (_, res) => {
  try {
    const allUsers = await UserData.find({});
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

const PORT = process.env.APP_PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server Url: http://localhost:${PORT}`);
});
