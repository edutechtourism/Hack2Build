import {
  avalancheFuji,
  ChainOptions,
  defineChain,
  sepolia,
} from "thirdweb/chains";

const avxHempLedgerChain = defineChain({
  id: 420102,
  name: "AVX HempLedger Chain",
  rpc: "https://54.242.47.91.sslip.io/ext/bc/BkbWWdRXHK7QWFZz3q9EYwKVjcR76BEJUeFBLk4Dx27VLt7DT/rpc",
  nativeCurrency: {
    name: "HEMP",
    symbol: "HEMP",
    decimals: 18,
  },
});

export enum AppChainId {
  sepolia = 11155111,
  avalancheFuji = 43113,
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
  [AppChainId.avalancheFuji]: avalancheFuji,
  [AppChainId.sepolia]: sepolia,
  [AppChainId.hempLedger]: avxHempLedgerChain,
};

export const appScanURLRecord: Record<AppChainId, string> = {
  [AppChainId.avalancheFuji]: "https://snowtrace.io/tx",
  [AppChainId.sepolia]: "https://sepolia.etherscan.io/tx",
  [AppChainId.hempLedger]: "https://sepolia.etherscan.io/tx",
};

export interface IAppContract {
  chainId: AppChainId;
  address: string;
}
