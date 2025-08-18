"use client";
import { appNetworkRecord } from "@/contracts/settings";
import { thirdwebClientSide } from "@/lib/thirdweb/client";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

export const ConnectWallet = () => {
  const wallets = [createWallet("io.metamask"), createWallet("me.rainbow")];

  return (
    <div>
      <ConnectButton
        client={thirdwebClientSide}
        showAllWallets={false}
        wallets={wallets}
        recommendedWallets={[createWallet("io.metamask")]}
        chains={Object.values(appNetworkRecord)}
        connectModal={{
          title: "HempSat",
          showThirdwebBranding: false,
        }}
        // auth={{
        //   async doLogin(params) {
        //     // call your backend to verify the signed payload passed in params
        //   },
        //   async doLogout() {
        //     // call your backend to logout the user if needed
        //   },
        //   async getLoginPayload(params) {
        //     // call your backend and return the payload
        //   },
        //   async isLoggedIn() {
        //     // call your backend to check if the user is logged in
        //   },
        // }}
        connectButton={{ label: "Sign in" }}
      />
    </div>
  );
};
