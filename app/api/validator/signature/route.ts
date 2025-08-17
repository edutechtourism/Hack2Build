import { TypedDataDomain, TypedDataField, ethers } from "ethers";

export async function GET() {
  const walletPrivateKey = process.env.WALLET_PRIVATE_KEY!;

  const wallet = new ethers.Wallet(walletPrivateKey);
  const publicAddress = await wallet.getAddress();

  const domain: TypedDataDomain = {
    chainId: 11155420,
    name: "Hackathon",
    verifyingContract: "0xe21A33e033fC1cBf13Aff458Adc3b26f2e662123",
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
    publicAddress,
    signature,
  };
  return Response.json({ data });
}
