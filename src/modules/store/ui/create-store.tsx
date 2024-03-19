"use client";

import {useRouter} from "next/navigation";
import useCreateStore from "../lib/useCreateStore";
import { StoreForm } from "../components/rental-form";

import useSelectStore from "../lib/useSelectStore";





export default function CreateStore() {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useCreateStore({
    onCreate() {
      router.back();
    },
  });

  const {users} = useSelectStore()

  // const users = await getUsers();
  // const warehouses = await getBodegas();
  // console.log(users);

  return (
    <div>
      <StoreForm
      users={users}
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
