import { TypedDataDomain, TypedDataField, ethers } from "ethers";

export async function GET() {
  const validatorWalletPrivateKey = process.env.VALIDATOR_WALLET_PRIVATE_KEY!;

  const wallet = new ethers.Wallet(validatorWalletPrivateKey);
  const publicAddress = await wallet.getAddress();
  const contractAddres = "0x64D6581D4084Ae01d787A7e9bE333e9F8dB26B57";

  const domain: TypedDataDomain = {
    chainId: 11155420,
    verifyingContract: contractAddres,
    name: "Hackathon",
    version: "1.0.0",
  };

  const types: Record<string, Array<TypedDataField>> = {
    AirdropClaim: [
      { name: "account", type: "address" },
      { name: "amount", type: "uint256" },
    ],
  };
  const value = {
    account: "0x3d4670AE7C08e5812F616E16bCf14b79a25F6F53",
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
