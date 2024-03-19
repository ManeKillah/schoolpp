"use client";

import {useRouter} from "next/navigation";

import useCreateProject from "../lib/useCreateProject";
import { ProjectForm } from "../components/rental-form";



export default function CreateProject() {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useCreateProject({
    onCreate() {
      router.back();
    },
  });

  // const {users, warehouses} = useSelectRental()

  // const users = await getUsers();
  // const warehouses = await getBodegas();
  // console.log(users, warehouses);

  return (
    <div>
      <ProjectForm
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
