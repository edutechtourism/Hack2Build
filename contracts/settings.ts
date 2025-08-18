import {
  avalancheFuji,
  ChainOptions,
  optimismSepolia,
  sepolia,
} from "thirdweb/chains";

export enum AppChainId {
  optimismSepolia = 11155420,
  sepolia = 11155111,
  avalancheFuji = 43113,
}

export const appNetworkRecord: Record<
  AppChainId,
  Readonly<
    ChainOptions & {
      rpc: string;
    }
  >
> = {
  [AppChainId.avalancheFuji]: avalancheFuji,
  [AppChainId.optimismSepolia]: optimismSepolia,
  [AppChainId.sepolia]: sepolia,
};

// export const appNetworkPathRecord: Record<AppChainId, string> = {
//   [AppChainId.optimismSepolia]: formatToValidPath(optimismSepolia),
//   [AppChainId.sepolia]: formatToValidPath(sepolia),
// };

export const appScanURLRecord: Record<AppChainId, string> = {
  [AppChainId.avalancheFuji]: "https://snowtrace.io/tx",
  [AppChainId.optimismSepolia]: "https://sepolia-optimism.etherscan.io/tx",
  [AppChainId.sepolia]: "https://sepolia.etherscan.io/tx",
};

export interface IAppContract {
  chainId: AppChainId;
  address: string;
  // path: string;
}
