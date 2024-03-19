"use client";

import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";
import { ContainerForm } from "../components/rental-form";
// import { Container } from "postcss";
import useUpdateContainer from "../lib/useUpdateContainer";
import { Container } from "@/@types/dto/container";
import useSelectContainer from "../lib/useSelectContainer";

export default function UpdateContainer({container}: {container: Container}) {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useUpdateContainer(container, {
    onUpdate() {
      router.back();
    },
  });

  // console.log(99, packages);

  const {users, projects, equipments, stores} = useSelectContainer()

  return (
    <div>
      <ContainerForm
      projects={projects}
      equipments={equipments}
      stores={stores}
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
