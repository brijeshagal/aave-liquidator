import { formatUnits, parseAbi } from "viem";
import { AAVE_V3_POOL } from "../aave/contract";
import { getPublicClient } from "../publicClient";

// CHECKER FILE TO SEE THE DATA 

const USER_ACCOUNT_DATA_ABI = parseAbi([
  "function getUserAccountData(address user) external view returns (uint256 totalCollateralBase, uint256 totalDebtBase, uint256 availableBorrowsBase, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)",
]);

async function getUserAccountData() {
  const data = await getPublicClient().readContract({
    address: AAVE_V3_POOL,
    abi: USER_ACCOUNT_DATA_ABI,
    functionName: "getUserAccountData",
    args: ["0x223c381a3aae44f7e073e66a8295dce2955e0098"],
  });

  const userHealthFactor = formatUnits(data[5], 18);

  console.log({ userHealthFactor });
  return data;
}

getUserAccountData();
