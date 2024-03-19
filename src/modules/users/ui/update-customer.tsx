"use client";

import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";

import useUpdateCustomer from "@/modules/users/lib/useUpdateCustomer";
import {CustomersForm} from "@/modules/users/components/customers-form";

export default function UpdateCustomer({customer}: {customer: User}) {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useUpdateCustomer(customer, {
    onUpdate() {
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
