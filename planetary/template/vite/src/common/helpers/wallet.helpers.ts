import { logger } from "../utils/logger.utils";

/**
 * Parses wallet address by extracting the actual address part
 * @param walletAddress - The full wallet address (e.g., "0x123...")
 * @returns The address with first 4 and last 4 characters
 */
export const parseWalletAddress = (walletAddress: string): string => {
  try {
    return `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
  } catch (err) {
    if (err instanceof Error) {
      logger.error("Failed to parse wallet address", err);
    } else {
      logger.error("Failed to parse wallet address", new Error(String(err)));
    }
    return walletAddress;
  }
};
