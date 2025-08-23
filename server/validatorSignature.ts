"use server";
import {
  ActionType,
  PrivacySetting,
} from "@/app/regenerative_actions/_components/models";
import { carbonEngineContracts } from "@/contracts/contracts";
import { AppChainId } from "@/contracts/settings";
import { TypedDataDomain, TypedDataField, ethers } from "ethers";
import { Hex } from "thirdweb";

export const evaluateRegenerativeAction = async (farmerAddress: string) => {
  const currentTime = Date.now();
  const signer = "0x79Ea116700B6cac3B0ed341aACd36dFfc7716001";
  const regenarativeAction: readonly [string, string, number, number, bigint] =
    [
      `${currentTime}`,
      farmerAddress,
      ActionType.CoverCrop,
      PrivacySetting.PUBLIC,
      BigInt(currentTime),
    ];

  return { regenarativeAction, rewards: BigInt(1 * 1e18), signer };
};

export const getSignatureForValidRegAction = async (
  action: {
    actionId: string;
    farmerAddress: string;
    actionType: ActionType;
    privacySetting: PrivacySetting;
    createdAt: bigint;
  },
  rewards: bigint
) => {
  const { actionId, farmerAddress, actionType, createdAt, privacySetting } =
    action;
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
      createdAt,
    },
    amount: rewards,
  };

  const signature = await wallet.signTypedData(domain, types, value);
  return signature as Hex;
};
