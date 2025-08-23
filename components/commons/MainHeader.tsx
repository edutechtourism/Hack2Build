import Link from "next/link";
import { ConnectWallet } from "./ConnectWallet";

export const MainHeader = () => {
  return (
    <div className="mb-3 p-3 flex items-center border-b">
      <div className="flex-grow flex">
        <div>
          <Link href={"/"} className="font-bold">
            HEMPSAT
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div>
          <Link href={"/dashboard"} className="font-bold underline">
            Dashboard
          </Link>
        </div>
        <ConnectWallet />
      </div>
    </div>
  );
};
