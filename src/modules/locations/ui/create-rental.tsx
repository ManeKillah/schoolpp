"use client";

import {useRouter} from "next/navigation";

// import {PackageForm} from "../components/rental-form";
// import useCreateCustomer from "../lib/useCreatePackage";
import useCreateRental from "../lib/useCreateRental";
import { RentalForm } from "../components/rental-form";
import useSelectRental from "../lib/useSelectRental";



export default function CreateRental() {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useCreateRental({
    onCreate() {
      router.back();
    },
  });

  const {container, project, equipment} = useSelectRental()

  console.log(33, container, project);

  // const users = await getUsers();
  // const warehouses = await getBodegas();
  // console.log(users, warehouses);

  return (
    <div>
      <RentalForm
      container={container}
      equipment={equipment}
      project={project}
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
