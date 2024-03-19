import {Plane} from "lucide-react";

import {AccountOptions} from "@/shared/components/layout/account-options";
import {AsideToggle} from "@/shared/components/layout/aside-toggle";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-3 py-1 shadow-sm md:px-4 md:py-2">
      <div className="flex items-center gap-2">
        {/* <AsideToggle /> */}
        <span className="flex items-center gap-2 text-lg font-bold p-4">
          {/* <Plane /> */}
          <img  alt="Logo" src="/schoolpp_logo.png" className="mx-auto mt-8" style={{ maxWidth: "150px" }} />
        </span>
      </div>
      <div className="flex items-center gap-2">
        <AccountOptions />
      </div>
    </header>
  );
}
