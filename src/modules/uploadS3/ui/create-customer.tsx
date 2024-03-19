"use client";

import {useRouter} from "next/navigation";

import {CustomersForm} from "../components/customers-form";
import useCreateCustomer from "../lib/useCreateCustomer";

export default function CreateCustomer() {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useCreateCustomer({
    onCreate() {
      router.back();
    },
  });

  return (
    <div>
      <CustomersForm
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
