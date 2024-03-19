"use client";

import {useRouter} from "next/navigation";
import useCreateEquipment from "../lib/useCreateEquipment";
import { EquipmentForm } from "../components/rental-form";
import useSelectEquipment from "../lib/useSelectEquipment";




export default function CreateEquipment() {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useCreateEquipment({
    onCreate() {
      router.back();
    },
  });

  const { equipments} = useSelectEquipment()

  // const users = await getUsers();
  // const warehouses = await getBodegas();
  // console.log(users, warehouses);

  return (
    <div>
      <EquipmentForm
      equipments={equipments}
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
