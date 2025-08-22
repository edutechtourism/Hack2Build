"use client";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { WalletTokensBalance } from "./WalletTokensBalance";
import { AppChainId } from "@/contracts/settings";

export const Account = () => {
  const activeAccount = useActiveAccount();
  const activeWalletChain = useActiveWalletChain();

  if (!activeAccount || !activeWalletChain) return <></>;

  const currentChain: AppChainId = activeWalletChain.id;

  return (
    <div>
      <WalletTokensBalance
        activeAccount={activeAccount}
        currentChainId={currentChain}
      />
    </div>
  );
};
