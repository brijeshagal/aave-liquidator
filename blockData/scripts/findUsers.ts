import fs from "fs";
import { parseAbiItem } from "viem";
import { AAVE_V3_POOL, USDC_ADDRESS, WBTC_ADDRESS } from "../aave/contract";
import { getPublicClient } from "../publicClient";

const BLOCKS_CHUNK_SIZE = 10000n;
const MAX_USERS = 20;

// ABI for Supply Event
const SUPPLY_EVENT_ABI = parseAbiItem(
  "event Supply(address indexed reserve, address indexed user, address indexed onBehalfOf, uint256 amount, uint16 referralCode)"
);

// ABI for Borrow Event
const BORROW_EVENT_ABI = parseAbiItem(
  "event Borrow(address indexed reserve, address user, address indexed onBehalfOf, uint256 amount, uint8 interestRateMode, uint256 borrowRate, uint16 indexed referralCode)"
);

async function findWBTCDepositorsAndBorrowers() {
  const START_BLOCK = await getPublicClient().getBlockNumber();
  let suppliers = new Set();
  let borrowers: Set<string> = new Set();
  let currentBlock = START_BLOCK;

  console.log(
    `🔍 Searching for WBTC suppliers starting from block ${START_BLOCK}...`
  );

  while (suppliers.size < MAX_USERS) {
    const fromBlock = currentBlock - BLOCKS_CHUNK_SIZE;
    console.log(`📡 Querying blocks ${fromBlock} to ${currentBlock}...`);

    try {
      // Fetch WBTC Supply Logs
      const supplyLogs = await getPublicClient().getLogs({
        address: AAVE_V3_POOL,
        event: SUPPLY_EVENT_ABI,
        fromBlock,
        toBlock: fromBlock + BLOCKS_CHUNK_SIZE,
        args: { reserve: WBTC_ADDRESS },
      });

      supplyLogs.forEach((log) => suppliers.add(log.args.user));

      console.log(`✅ Found ${suppliers.size} unique WBTC suppliers so far.`);

      if (suppliers.size >= MAX_USERS) break;
    } catch (error) {
      console.error("⚠️ Error fetching supply logs:", error);
    }

    currentBlock = fromBlock;
  }

  console.log(`🎉 Found ${suppliers.size} unique users who supplied WBTC!`);
  console.log([...suppliers]);

  // Now check which of these users later borrowed any asset
  console.log("🔍 Checking if these users borrowed any asset...");

  currentBlock = await getPublicClient().getBlockNumber();
  while (borrowers.size < MAX_USERS) {
    const fromBlock = currentBlock - BLOCKS_CHUNK_SIZE;
    console.log(
      `📡 Querying borrow logs from ${fromBlock} to ${currentBlock}...`
    );

    try {
      // Fetch Borrow Logs
      const borrowLogs = await getPublicClient().getLogs({
        address: AAVE_V3_POOL,
        event: BORROW_EVENT_ABI,
        fromBlock,
        toBlock: fromBlock + BLOCKS_CHUNK_SIZE,
        args: { reserve: USDC_ADDRESS },
      });

      borrowLogs.forEach((log) => {
        const user = log.args.user?.toString();
        if (user && suppliers.has(user)) {
          borrowers.add(user);
        }
      });

      console.log(
        `✅ Found ${borrowers.size} users who borrowed after supplying WBTC.`
      );

      // if (borrowers.size >= MAX_USERS) break;
    } catch (error) {
      console.error("⚠️ Error fetching borrow logs:", error);
    }

    currentBlock = fromBlock;
  }

  console.log(`🎉 Users who supplied WBTC and later borrowed:`);
  console.log(borrowers);

  fs.writeFileSync(
    "suppliers.json",
    JSON.stringify(Array.from(suppliers), null, 2)
  );
  fs.writeFileSync(
    "borrowers.json",
    JSON.stringify(Array.from(borrowers), null, 2)
  );

  return borrowers;
}

findWBTCDepositorsAndBorrowers();
