"use client";

import { getContractByChainAndAddress } from "@/contracts/client";
import { farmerRegistryFactoryContracts } from "@/contracts/contracts";
import { AppChainId } from "@/contracts/settings";
import { useRouter } from "next/navigation";
import { prepareContractCall } from "thirdweb";
import { useSendAndConfirmTransaction } from "thirdweb/react";

export const CreateFarmerRegistry = ({
  farmerAddress,
}: {
  farmerAddress: string;
}) => {
  const router = useRouter();
  const { mutateAsync, isPending, error, isError } =
    useSendAndConfirmTransaction();

  const onSubmit = async () => {
    const tx = prepareContractCall({
      contract: getContractByChainAndAddress(
        AppChainId.hempLedger,
        farmerRegistryFactoryContracts[0].address
      ),
      method: "function createRegistry(address _farmer) external",
      params: [farmerAddress],
    });
    await mutateAsync(tx);
    router.refresh();
  };

  return (
    <div>
      <div>
        <button
          type="submit"
          onClick={async () => {
            await onSubmit();
          }}
          className="bg-blue-200 rounded-md p-2 cursor-pointer"
        >
          Create a registry
        </button>
      </div>
      <div>
        {isPending && <div>Loading transaction ...</div>}
        {isError && <div className="text-sm text-red-700">{error.message}</div>}
      </div>
    </div>
  );
};
