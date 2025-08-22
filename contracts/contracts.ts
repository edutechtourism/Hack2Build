import { AppChainId, IAppContract } from "./settings";

export const carbonCreditTokenContracts: IAppContract[] = [
  {
    chainId: AppChainId.hempLedger,
    address: "0x279C26F54458A23d141845aa2d6804f59d1aCBd0",
  },
];

export const carbonEngineContracts: IAppContract[] = [
  {
    chainId: AppChainId.hempLedger,
    address: "0x5A47e0814293AB3AF4354289Fd6ECd8b3095DF3c",
  },
];

export const farmerRegistryFactoryContracts: IAppContract[] = [
  {
    chainId: AppChainId.hempLedger,
    address: "0xe6c27518CAf5c0932d6cc012f76f0c5430dbd9b8",
  },
];
