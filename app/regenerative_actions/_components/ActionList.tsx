"use client";

import { getDecryptedData } from "@/server/manageActions";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { IRegenerativeAction } from "./models";

export const ActionList = () => {
  const activeAccount = useActiveAccount();
  const [actions, setActions] = useState<IRegenerativeAction[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeAccount) {
      setIsLoading(true);
      getDecryptedData(activeAccount.address).then((_) => {
        setActions(_);
        setIsLoading(false);
      });
    }
  }, [activeAccount]);

  return (
    <div>
      <div>{isLoading && "Decrypting actions ..."}</div>
      <div>{JSON.stringify(actions)}</div>
    </div>
  );
};
