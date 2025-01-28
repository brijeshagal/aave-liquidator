import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();

export const getPublicClient = () => {
  return createPublicClient({
    chain: mainnet,
    transport: http(process.env.ALCHEMY_RPC),
  });
};
