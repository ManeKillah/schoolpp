"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React from "react";

import {Input} from "@/shared/components/ui/input";

export function Search() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Input
      className="max-w-sm"
      defaultValue={params.get("q") ?? ""}
      name="q"
      placeholder="Buscar direcciones..."
      type="search"
      onKeyUp={(e) => {
        if (e.code === "Enter") {
          const value = e.currentTarget.value;
          const searchParams = new URLSearchParams();

          if (value) searchParams.set("q", value);
          router.push(`${pathname}?${searchParams.toString()}`);
        }
      }}
    />
  );
}
