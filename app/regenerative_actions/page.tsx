import { ActionList } from "./_components/ActionList";
import { ManageActions } from "./_components/ManageActions";

export default async function Page() {
  return (
    <div>
      <div>Register actions page</div>
      <ActionList />
      <ManageActions />
    </div>
  );
}
