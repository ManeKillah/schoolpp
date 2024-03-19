"use client";

import type {FormInputs} from "../../lib/useCreateAddress";
import type {Control, FieldErrors, UseFormRegister} from "react-hook-form";

import {useState, type BaseSyntheticEvent} from "react";
import {SaveIcon} from "lucide-react";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";

import {Input} from "@/shared/components/ui/input";
import {Label} from "@/shared/components/ui/label";
import {ErrorInput} from "@/shared/components/ui/input-error";
import {Button} from "@/shared/components/ui/button";
import Spinner from "@/shared/components/ui/spinner";
import {InputPhone} from "@/shared/components/ui/input-phone";

export function AddressForm({
  errors,
  loading,
  control,
  register,
  onSubmit,
  user_id,
}: {
  loading: boolean;
  errors: FieldErrors<FormInputs>;
  control: Control<FormInputs>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<FormInputs>;
  user_id: number;
}) {
  const countries = [
    {id: "US", value: "Estados unidos"},
    {id: "COL", value: "Colombia"},
  ];
  const [addressVal, setAddress] = useState("");

  const handleChange = (address: string) => {
    setAddress(address);
  };

  const handleSelect = (address: string) => {
    setAddress(address);
    console.log(address);
  };

  return (
    <form onSubmit={onSubmit}>
      {/* User ID */}
      <PlacesAutocomplete
        searchOptions={{
          location: new window.google.maps.LatLng(11.004107, -74.806984),
          radius: 50000,
          componentRestrictions: {country: ["us", "co"]},
        }}
        value={addressVal}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({getInputProps, suggestions, getSuggestionItemProps, loading: loadinglist}) => (
          <div>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              style={{width: "100%", padding: 5, border: "1px solid"}}
              {...getInputProps({
                className: "location-search-input",
                onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                  // Your onKeyDown logic here
                },
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loadinglist ? <div>Loading...</div> : null}
              {suggestions.map((suggestion) => {
                return (
                  <div {...getSuggestionItemProps(suggestion)} key={suggestion.index}>
                    <div>
                      <p
                        style={{
                          cursor: "pointer",
                          fontWeight: "bold",
                          margin: 0,
                        }}
                      >
                        {suggestion.formattedSuggestion.mainText}
                      </p>
                      <p className="cursor-pointer">
                        {suggestion.formattedSuggestion.secondaryText}
                      </p>
                    </div>
                    <span>{`>`}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <input type="hidden" {...register("user_id")} value={user_id} />
      <div className="mb-3">
        <Label htmlFor="name">Dirección</Label>
        <Input
          id="address_line1"
          type="text"
          {...register("address_line1")}
          placeholder="Dirección"
        />
        {errors.address_line1 ? <ErrorInput>{errors.address_line1.message}</ErrorInput> : null}
      </div>
      <div className="mb-3">
        <Label htmlFor="name">Detalles</Label>
        <Input
          id="address_line2"
          type="text"
          {...register("address_line2")}
          placeholder="Dirección"
        />
        {errors.address_line2 ? <ErrorInput>{errors.address_line2.message}</ErrorInput> : null}
      </div>

      <div className="mb-3">
        <Label htmlFor="last_name">Ciudad</Label>
        <Input id="city" placeholder="Ciudad" {...register("city")} />
        {errors.city ? <ErrorInput>{errors.city.message}</ErrorInput> : null}
      </div>

      <div className="mb-3">
        <Label htmlFor="country_iso_code">Pais</Label>
        <select {...register("country_iso_code")} className="CustomSelect">
          <option value="">Eliga un pais..</option>
          {countries.map((country, index) => (
            <option key={`shop-${index}`} value={country.id}>
              {country.value}
            </option>
          ))}
        </select>
        {errors.country_iso_code ? (
          <ErrorInput>{errors.country_iso_code.message}</ErrorInput>
        ) : null}
      </div>

      <div className="flex justify-center">
        <Button className="flex w-[150px] items-center gap-1" disabled={loading} type="submit">
          {loading ? <Spinner /> : <SaveIcon className="size-4" />} Guardar
        </Button>
      </div>
    </form>
  );
}
