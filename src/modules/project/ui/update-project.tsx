"use client";

import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";
import { Rental } from "@/@types/dto/rental";
// import useUpdateRental from "../lib/useUpdateRental";
import { ProjectForm } from "../components/rental-form";
import useUpdateProject from "../lib/useUpdateProject";
import { Project } from "@/@types/dto/project";

export default function UpdateProject({project}: {project: Project}) {
  const router = useRouter();

  const {formMethods, loading, handleSubmit} = useUpdateProject(project, {
    onUpdate() {
      router.back();
    },
  });

  // console.log(99, packages);

  // const {users, warehouses} = useSelectPackage()

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
