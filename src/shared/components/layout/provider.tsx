"use client";
import React from "react";

import {cn} from "@/shared/lib/utils";

export interface LayoutContext {
  showAside: boolean;
  setShowAside: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutContext = React.createContext({
  showAside: true,
} as LayoutContext);

export function LayoutProvider({children}: {children: React.ReactNode}) {
  const [showAside, setShowAside] = React.useState(
    typeof window !== "undefined" && window.screen.width <= 425 ? false : true,
  );

  return (
    <LayoutContext.Provider value={{showAside, setShowAside}}>
      <div className={cn("dashboard", !showAside && "sidebar-hidden")}>{children}</div>
    </LayoutContext.Provider>
  );
}

export const useLayout = () => React.useContext(LayoutContext);
