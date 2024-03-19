"use client";

import {useRouter} from "next/navigation";

import useCreateAddress from "../lib/useCreateAddress";
import { AddressForm } from "../components/address-form";

export default function CreateAddress({ user_id }: { user_id: number }) {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useCreateAddress({
    onCreate() {
      router.back();
    },
  });

  return (
    <div>
      <AddressForm
      user_id={user_id}
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
