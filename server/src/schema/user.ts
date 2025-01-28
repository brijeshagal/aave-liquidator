import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  beforeSimulation: {
    totalCollateralBase: String,
    totalDebtBase: String,
    healthFactor: String,
  },
  afterSimulation: {
    totalCollateralBase: String,
    totalDebtBase: String,
    healthFactor: String,
  },
  afterLiquidation: {
    totalCollateralBase: String,
    totalDebtBase: String,
    healthFactor: String,
  },
});

export default userSchema;
