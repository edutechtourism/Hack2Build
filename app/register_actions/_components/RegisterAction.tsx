import { getContractByChainAndAddress } from "@/contracts/client";
import { carbonEngineContracts } from "@/contracts/contracts";
import { AppChainId } from "@/contracts/settings";
import {
  evaluateRegenerativeAction,
  getSignatureForValidRegAction,
} from "@/server/validatorSignature";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { prepareContractCall } from "thirdweb";
import { useSendAndConfirmTransaction } from "thirdweb/react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(5),
  level: z.number().int(),
});
type SchemaType = z.infer<typeof schema>;

export const RegisterAction = ({
  farmerAddress,
  farmerRegistry,
}: {
  farmerAddress: string;
  farmerRegistry: string;
}) => {
  const {} = useForm<SchemaType>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { mutate, isPending, error, isError } = useSendAndConfirmTransaction();

  const onSubmit = async () => {
    const metadata = await evaluateRegenerativeAction(farmerAddress);
    const { regenarativeAction, rewards, signer } = metadata;
    const signature = await getSignatureForValidRegAction(
      {
        actionId: regenarativeAction[0],
        farmerAddress,
        actionType: regenarativeAction[2],
        privacySetting: regenarativeAction[3],
        createdAt: regenarativeAction[4],
      },
      rewards
    );

    const tx = prepareContractCall({
      contract: getContractByChainAndAddress(
        AppChainId.hempLedger,
        carbonEngineContracts[0].address
      ),
      method:
        "function claimCarbonCredits((string,address,uint8,uint8,uint256) memory _regenarativeAction, address _farmerRegistry, uint256 _amount, address _signer, bytes memory _signature) external",
      params: [regenarativeAction, farmerRegistry, rewards, signer, signature],
    });
    mutate(tx);
  };

  return (
    <div>
      <div>Register</div>
      <div>
        <button
          type="button"
          onClick={async () => {
            await onSubmit();
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
