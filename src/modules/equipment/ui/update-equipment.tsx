"use client";


import { Equipment } from "@/@types/dto/equipment";
import {useRouter} from "next/navigation";
import useUpdateEquipment from "../lib/useUpdateEquipment";
import { EquipmentForm } from "../components/rental-form";

export default function UpdateEquipment({equipment}: {equipment: Equipment}) {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useUpdateEquipment(equipment, {
    onUpdate() {
      router.back();
    },
  });

  // console.log(99, packages);

  // const {users, warehouses} = useSelectPackage()

  return (
    <div>
      <EquipmentForm
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
