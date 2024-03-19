"use client";

import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";

import { Container } from "@/@types/dto/container";
import { Store } from "@/@types/dto/store";
import useUpdateStore from "../lib/useUpdateStore";
import { StoreForm } from "../components/rental-form";

export default function UpdateStore({store}: {store: Store}) {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useUpdateStore(store, {
    onUpdate() {
      router.back();
    },
  });

  // console.log(99, packages);

  // const {users, warehouses} = useSelectPackage()

  return (
    <div>
      <StoreForm
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
