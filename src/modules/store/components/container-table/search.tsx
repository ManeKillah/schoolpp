"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React from "react";

import {Input} from "@/shared/components/ui/input";
import { City } from "@/@types/dto/city";

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
export function LocationSelect({locations}:{locations: City[]}) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSelectChange = (e: any) => {
    const selectedLocation = e.target.value;
    const searchParams = new URLSearchParams();

    if (selectedLocation) {
      searchParams.set('location', selectedLocation);
      router.push(`${pathname}?${searchParams.toString()}`);
    }
  };

  return (
    <select
      className="max-w-sm"
      defaultValue={params.get('location') ?? ''}
      name="location"
      onChange={handleSelectChange}
    >
      <option value="">Seleccionar ubicación...</option>
      {locations.map((location: City, index: number) => (
        <option key={index} value={location.id}>
          {location.name}
        </option>
      ))}
    </select>
  );
}