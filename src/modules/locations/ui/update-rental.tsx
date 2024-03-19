"use client";

import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";
import { Rental } from "@/@types/dto/rental";
import useUpdateRental from "../lib/useUpdateRental";
import { RentalForm } from "../components/rental-form";

export default function UpdateRental({rental}: {rental: Rental}) {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useUpdateRental(rental, {
    onUpdate() {
      router.back();
    },
  });

  // console.log(99, packages);

  // const {users, warehouses} = useSelectPackage()

  return (
    <div>
      <RentalForm
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
