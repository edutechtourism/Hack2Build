import { CommonLayout } from "@/components/commons/CommonLayout";
import { ActionList } from "./_components/ActionList";
import { ManageActions } from "./_components/ManageActions";

import { MrvActions } from "./_components/MrvActions";

export default async function Page() {
  return (
    <CommonLayout>
      {/* Outer grid: two columns from the very top */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-6 w-full">
      {/* LEFT COLUMN */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Regenerative Actions</h1>
        <ActionList />
        <ManageActions />
        
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">MRV → $HEMP Minting Process</h1>
        <MrvActions />  
      </div>
    </div>

    </CommonLayout>
  );
}
