"use client";

import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";

// import useUpdateCustomer from "@/modules/users/lib/useUpdateCustomer";
// import {CustomersForm} from "@/modules/users/components/customers-form";
import useUpdateAdmin from "../lib/useUpdateAdmin";
import { AdminsForm } from "../components/admins-form";

export default function UpdateAdmin({customer}: {customer: User}) {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useUpdateAdmin(customer, {
    onUpdate() {
      router.back();
    },
  });

  return (
    <div>
      <AdminsForm
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
