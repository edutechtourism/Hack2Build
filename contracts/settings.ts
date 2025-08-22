import { ChainOptions, defineChain } from "thirdweb/chains";

const avxHempLedgerChain = defineChain({
  id: 420103,
  name: "AVX HempLedger",
  rpc: "https://3.87.13.248.sslip.io/ext/bc/cSsiFuLgqXPMWhzd8uMckBVgYdRLjkDbpdto6r31PfMvFb6Qn/rpc",
  nativeCurrency: {
    name: "HEMP",
    symbol: "HEMP",
    decimals: 18,
  },
});

export enum AppChainId {
  // sepolia = 11155111,
  // avalancheFuji = 43113,
  hempLedger = avxHempLedgerChain.id,
}

export const appNetworkRecord: Record<
  AppChainId,
  Readonly<
    ChainOptions & {
      rpc: string;
    }
  >
> = {
  // [AppChainId.avalancheFuji]: avalancheFuji,
  // [AppChainId.sepolia]: sepolia,
  [AppChainId.hempLedger]: avxHempLedgerChain,
};

export const appScanURLRecord: Record<AppChainId, string> = {
  // [AppChainId.avalancheFuji]: "https://snowtrace.io/tx",
  // [AppChainId.sepolia]: "https://sepolia.etherscan.io/tx",
  [AppChainId.hempLedger]: "https://sepolia.etherscan.io/tx",
};

export interface IAppContract {
  chainId: AppChainId;
  address: string;
}
