"use client";

import {useRouter} from "next/navigation";

// import {CustomersForm} from "../components/customers-form";
// import useCreateCustomer from "../lib/useCreateCustomer";
import useCreateAdmin from "../lib/useCreateAdmin";
import { AdminsForm } from "../components/admins-form";

export default function CreateAdmin() {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useCreateAdmin({
    onCreate() {
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
