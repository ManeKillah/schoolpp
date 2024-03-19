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
      placeholder="Buscar por Proyecto / Equipo..."
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

export function FilterButtons() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex space-x-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded Todos"
        onClick={() => {
          router.push(`${pathname}`);
        }}
      >
        Todos
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded Activos"
        onClick={() => {
          router.push(`${pathname}?status=active`);
        }}
      >
        Activos
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded Inactivos"
        onClick={() => {
          router.push(`${pathname}?status=inactive`);
        }}
      >
        Inactivos
      </button>
    </div>
  );
}
