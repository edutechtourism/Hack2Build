"use client";
import { PROTECTED_ROUTES } from "@/middleware";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";

export const HeaderLinks = () => {
  const pathname = usePathname();
  const activeAccount = useActiveAccount();

  return (
    <>
      {!!activeAccount &&
        PROTECTED_ROUTES.map((_) => (
          <div key={_.path}>
            <Link
              href={_.path}
              className={`${pathname === _.path ? "font-bold" : "underline"}`}
            >
              {_.label}
            </Link>
          </div>
        ))}
    </>
  );
};
