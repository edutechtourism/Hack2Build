"use client";

import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

export const ActionList = () => {
  const activeAccount = useActiveAccount();
  const [farmerData, setFarmerData] = useState();

  return (
    <div>
      <div>ActionList</div>
    </div>
  );
};
