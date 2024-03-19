"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
// import useCreateStore from "../lib/useCreateStore";
// import { StoreForm } from "../components/rental-form";

// import useSelectStore from "../lib/useSelectStore";
import { City } from "@/@types/dto/city";
import useSelectContainer from "../lib/useSelectContainer";





export default function LocationSelect() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const {cities} = useSelectContainer()
  const locations = cities;

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
        <option key={index} value={location.name}>
          {location.name}
        </option>
      ))}
    </select>
  );
}
