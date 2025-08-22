"use server";
import {
  ActionType,
  PrivacySetting,
} from "@/app/register_actions/_components/models";
import { carbonEngineContracts } from "@/contracts/contracts";
import { AppChainId } from "@/contracts/settings";
import { TypedDataDomain, TypedDataField, ethers } from "ethers";

export const getSignatureForValidRegAction = async (
  actionId: string,
  farmerAddress: string,
  actionType: ActionType,
  privacySetting: PrivacySetting,
  rewards: bigint
) => {
  const validatorWalletPrivateKey = process.env.VALIDATOR_WALLET_PRIVATE_KEY!;

  const wallet = new ethers.Wallet(validatorWalletPrivateKey);
  const contractAddres = carbonEngineContracts[0].address;

  const domain: TypedDataDomain = {
    chainId: AppChainId.hempLedger,
    verifyingContract: contractAddres,
    name: "CarbonCreditEngine",
    version: "1.0.0",
  };

  const types: Record<string, Array<TypedDataField>> = {
    RegenerativeAction: [
      { name: "id", type: "string" },
      { name: "farmer", type: "address" },
      { name: "actionType", type: "uint8" },
      { name: "privacySetting", type: "uint8" },
      { name: "createdAt", type: "uint256" },
    ],
    AwardWinningAction: [
      { name: "regenerativeAction", type: "RegenerativeAction" },
      { name: "amount", type: "uint256" },
    ],
  };

  const value = {
    regenerativeAction: {
      id: actionId,
      farmer: farmerAddress,
      actionType,
      privacySetting,
      createdAt: BigInt(Date.now()),
    },
    amount: rewards,
  };

  const signature = await wallet.signTypedData(domain, types, value);
  return signature;
};
