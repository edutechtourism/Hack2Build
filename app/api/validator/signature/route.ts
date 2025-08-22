import { carbonEngineContracts } from "@/contracts/contracts";
import { AppChainId } from "@/contracts/settings";
import { TypedDataDomain, TypedDataField, ethers } from "ethers";

export async function GET() {
  const validatorWalletPrivateKey = process.env.VALIDATOR_WALLET_PRIVATE_KEY!;

  const wallet = new ethers.Wallet(validatorWalletPrivateKey);
  const publicAddress = await wallet.getAddress();
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
      id: "1",
      farmer: "0x58Dc4256E7E5402cc1A88d9A63c640B1A3959722",
      actionType: 0,
      privacySetting: 0,
      createdAt: BigInt(1755622015040),
    },
    amount: BigInt(1 * 1e18),
  };

  const signature = await wallet.signTypedData(domain, types, value);
  const data = {
    contractAddres,
    publicAddress,
    signature,
  };
  return Response.json({ data });
}
