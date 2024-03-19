"use client";

import {useRouter} from "next/navigation";

import useCreateContainer from "../lib/useCreateContainer";
import { ContainerForm } from "../components/rental-form";
import useSelectContainer from "../lib/useSelectContainer";
import { serverFuncuin } from "@/app/lib/actions";
import { table } from "console";



export default function CreateContainer() {
  const router = useRouter();
  // const handleButton = ()=>{
  //   serverFuncuin('table')
  // }

  const {formMethods, loading, handleSubmit} = useCreateContainer({
    onCreate() {
      router.back();
    },
  });

  const {equipments, projects, stores} = useSelectContainer()



  return (
    <div>
      {/* <button onClick={handleButton}>serverAction</button> */}
      <ContainerForm
        stores={stores}
        equipments={equipments}
        projects={projects}
        control={formMethods.control}
        errors={formMethods.formState.errors}
        loading={loading}
        register={formMethods.register}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
