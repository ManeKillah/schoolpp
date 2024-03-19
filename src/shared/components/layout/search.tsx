"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { Input } from "@/shared/components/ui/input";
import { SearchIcon } from "lucide-react"; // Import the search icon
import { map } from "lodash";

const menu = {
  rental: 'alquiler',
  customers: 'usuario',
  container: 'contenedor',
  equipment: 'equipo',
  store: 'almacen',
  project: 'proyecto',
}
// const keys = Object.keys(menu);

export function Search() {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlesearch = (search: string) => {
    if (search) {
      // Verificar si el término de búsqueda existe en los valores del objeto `menu`
      const matchingKey = Object.keys(menu).find(key => menu[key as keyof typeof menu].toLowerCase() === search.toLowerCase());
      if (matchingKey) {
        // Reemplazar la ruta con el nombre de la clave correspondiente al valor encontrado
        replace(`${matchingKey}`);
      } else {
        console.log('error searching');
      }
    }
  };

  return (
    <div className="flex items-center max-w-sm border border-gray-300 rounded-lg p-1">
      <SearchIcon className="text-gray-500 mr-2" /> {/* Search icon */}
      <Input
        className="flex-grow outline-none" // Remove input border
        placeholder="Search..."
        type="search"
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            const value = e.currentTarget.value;
            handlesearch(value);
          }
        }}
      />
    </div>
  );
}
