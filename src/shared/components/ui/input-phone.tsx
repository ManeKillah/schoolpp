import "react-phone-input-2/lib/material.css";

import type {CountryData} from "react-phone-input-2";
import type {FieldPath} from "react-hook-form";

import {useController, type Control, type FieldValues} from "react-hook-form";
import React from "react";
import PhoneInput from "react-phone-input-2";

export function InputPhone<TFieldValues extends FieldValues = FieldValues>({
  control,
  countryFieldName,
  phoneFieldName,
}: {
  phoneFieldName: FieldPath<TFieldValues>;
  countryFieldName: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
}) {
  const {
    field: {value: countryCode, onChange: setCountryCode},
  } = useController({
    control,
    name: countryFieldName,
  });
  const {
    field: {value: phoneNumber, onChange: setPhoneNumber},
  } = useController({
    control,
    name: phoneFieldName,
  });

  return (
    <PhoneInput
      enableSearch
      inputProps={{
        className:
          "h-10 w-full rounded-md border border-input bg-background pl-14 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      }}
      specialLabel=""
      value={`${countryCode ?? ""}${phoneNumber ?? ""}`}
      onChange={(value, data: CountryData) => {
        if (data.dialCode) {
          setCountryCode(data.dialCode);
          setPhoneNumber(value.slice(data.dialCode.length).replace(/\s/g, ""));
        }
      }}
    />
  );
}
