import { Address, parseAbi } from "viem";
import { AAVE_DATA_PROVIDER, WBTC_ADDRESS } from "../aave/contract";
import { getPublicClient } from "../publicClient";

// CHECKER FILE TO SEE THE DATA

const USER_ADDRESS = "0xCb33EA36eeFe670EF33A0f9435cB04B6a30a33fd";

const USER_DATA_METHOD_ABI = parseAbi([
  "function getUserReserveData(address asset, address user) external view returns (uint256 currentATokenBalance, uint256 currentStableDebt, uint256 currentVariableDebt, uint256 principalStableDebt, uint256 scaledVariableDebt, uint256 stableBorrowRate, uint256 liquidityRate, uint40 stableRateLastUpdated, bool usageAsCollateralEnabled)",
]);

async function getUserReserveData(userAddress: Address) {
  const data = await getPublicClient().readContract({
    address: AAVE_DATA_PROVIDER,
    abi: USER_DATA_METHOD_ABI,
    functionName: "getUserReserveData",
    args: [WBTC_ADDRESS, userAddress],
    // blockNumber: 18589542n,
  });

  console.log({ data });

  return data;
}

getUserReserveData(USER_ADDRESS);
