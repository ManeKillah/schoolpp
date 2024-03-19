"use client";
import {Menu} from "lucide-react";

import {Button} from "@/shared/components/ui/button";

import {useLayout} from "./provider";

export function AsideToggle() {
  const {showAside, setShowAside} = useLayout();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        setShowAside(!showAside);
      }}
    >
      <Menu />
    </Button>
  );
}
