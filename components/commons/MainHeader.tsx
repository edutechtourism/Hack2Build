import Link from "next/link";
import { ConnectWallet } from "./ConnectWallet";
import { HeaderLinks } from "./HeaderLinks";

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
        <HeaderLinks />
        <ConnectWallet />
      </div>
    </div>
  );
};
