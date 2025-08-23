import { CommonLayout } from "@/components/commons/CommonLayout";
import { ActionList } from "./_components/ActionList";
import { ManageActions } from "./_components/ManageActions";

export default async function Page() {
  return (
    <CommonLayout>
      <div className="text-3xl font-bold">Regenerative actions</div>

      <ActionList />
      <ManageActions />
    </CommonLayout>
  );
}
