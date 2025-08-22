"use client";

import { getContractByChainAndAddress } from "@/contracts/client";
import { carbonEngineContracts } from "@/contracts/contracts";
import { AppChainId } from "@/contracts/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { prepareContractCall } from "thirdweb";
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(5),
  level: z.number().int(),
});
type SchemaType = z.infer<typeof schema>;

export const RegisterAction = () => {
  const activeAccount = useActiveAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { mutate, isPending, error, isError } = useSendAndConfirmTransaction();

  const onSubmit = async (wallet: string) => {
    const _regenarativeAction: readonly [
      string,
      string,
      number,
      number,
      bigint
    ] = [
      "1",
      "0x58Dc4256E7E5402cc1A88d9A63c640B1A3959722",
      0,
      0,
      BigInt(1755622015040),
    ];
    const tx = prepareContractCall({
      contract: getContractByChainAndAddress(
        AppChainId.hempLedger,
        carbonEngineContracts[0].address
      ),
      method:
        "function claimCarbonCredits((string,address,uint8,uint8,uint256) memory _regenarativeAction, address _farmerRegistry, uint256 _amount, address _signer, bytes memory _signature) external",
      params: [
        _regenarativeAction,
        "0x0A67AA6C1638816C2069F2548F5583eC3d0c5916",
        BigInt(1 * 1e18),
        "0x79Ea116700B6cac3B0ed341aACd36dFfc7716001",
        "0x644076a3b41b7d580aa79168d4a47026c5137b30beb539497e19a77d076f0bc62ed6933cdb856ad1eaca26aaba8681fc453120693fc9ddd25384702eb306627f1b",
      ],
    });
    mutate(tx);
  };

  if (!activeAccount) return <></>;

  return (
    <div>
      <div>Register</div>
      <div>
        <button
          type="button"
          onClick={async () => {
            await onSubmit(activeAccount.address);
          }}
          disabled={isPending}
        >
          Submit
        </button>
      </div>
      <div>
        {isPending && <div>Loading transaction ...</div>}
        {isError && <div className="text-sm text-red-700">{error.message}</div>}
      </div>
    </div>
  );
};
