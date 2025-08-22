"use client";
import { appNetworkRecord } from "@/contracts/settings";
import { thirdwebClientSide } from "@/lib/thirdweb/client";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { generatePayload, isLoggedIn, login, logout } from "@/server/login";

export const ConnectWallet = () => {
  const wallets = [
    createWallet("io.metamask"),
    createWallet("app.core.extension"),
  ];

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
        auth={{
          isLoggedIn: async (address) => {
            console.log("checking if logged in!", { address });
            return await isLoggedIn();
          },
          doLogin: async (params) => {
            console.log("logging in!");
            await login(params);
          },
          getLoginPayload: async ({ address }) => generatePayload({ address }),
          doLogout: async () => {
            console.log("logging out!");
            await logout();
          },
        }}
        connectButton={{ label: "Sign in" }}
      />
    </div>
  );
};
