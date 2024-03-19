"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React, { useState } from "react";

import {Input} from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

export function Search() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Input
      className="max-w-sm"
      defaultValue={params.get("q") ?? ""}
      name="q"
      placeholder="Buscar por referencia..."
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

export function DateRangePicker() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (startDate) searchParams.set("start_date", (startDate));
    if (endDate) searchParams.set("end_date", (endDate));

    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="flex items-center space-x-4">
      <Input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Fecha de inicio"
      />
      <Input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="Fecha de fin"
      />
      <Button onClick={handleSearch}>Buscar</Button>
    </div>
  );
}

