"use client";

import type {FormInputs} from "../../lib/useCreateCustomer";
import {useState, type BaseSyntheticEvent} from "react";
import type {Control, FieldErrors, UseFormRegister} from "react-hook-form";

import {SaveIcon} from "lucide-react";

import {Input} from "@/shared/components/ui/input";
import {Label} from "@/shared/components/ui/label";
import {ErrorInput} from "@/shared/components/ui/input-error";
import {Button} from "@/shared/components/ui/button";
import Spinner from "@/shared/components/ui/spinner";
import {InputPhone} from "@/shared/components/ui/input-phone";
import Link from "next/link";
import Image from "next/image";
import { serverFuncuin } from "@/app/lib/actions";

export function CustomersForm({
  errors,
  loading,
  control,
  register,
  onSubmit,
}: {
  loading: boolean;
  errors: FieldErrors<FormInputs>;
  control: Control<FormInputs>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<FormInputs>;
}) {
  const roles = [{ id: 'admin', value: 'Admin' }, { id: 'user', value: 'Usuario' }];
  const states = [{ id: 'active', value: 'Activo' }, { id: 'inactive', value: 'Inactivo' }];
  const [profileImage, setProfileImage] = useState(null);
  const handleImageUpload = (image: any) => {
    if(image){
      console.log(image);
      // serverFuncuin(image)
      setProfileImage(image);
    }else{
      return
    }
  }

  const handleRemoveImage = () => {
    setProfileImage(null);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="user-info">Información del Usuario</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-between">
          <div className="lg:ml-4">
            <div className="mb-3">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" type="text" {...register("first_name")} placeholder="Nombre" />
              {errors.first_name && <ErrorInput>{errors.first_name.message}</ErrorInput>}
            </div>
            <div className="mb-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} placeholder="Email" />
              {errors.email && <ErrorInput>{errors.email.message}</ErrorInput>}
            </div>
          </div>
          <div className="lg:ml-4">
            <div className="mb-3">
              <Label htmlFor="role">Rol</Label>
              <select {...register('role')} >
                <option value="">Eliga un rol..</option>
                {roles.map((role, index) => (
                  <option key={`role-${index}`} value={role.id}>
                    {role.value}
                  </option>
                ))}
              </select>
              {errors.role && <ErrorInput>{errors.role.message}</ErrorInput>}
            </div>
            <div className="mb-3">
              <Label htmlFor="status">Estado</Label>
              <select {...register('status')} >
                <option value="">Eliga un estado..</option>
                {states.map((state, index) => (
                  <option key={`state-${index}`} value={state.id}>
                    {state.value}
                  </option>
                ))}
              </select>
              {errors.status && <ErrorInput>{errors.status.message}</ErrorInput>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
  <Label className="text-lg font-bold" htmlFor="user-image">Agregar foto de perfil</Label>
  <div className="w-full lg:w-auto flex items-center mt-2 lg:mt-0">
    <div className="lg:ml-4 flex items-center">
      <Input id="profile_image" type="file" {...register('fileImage')} onChange={(e) => handleImageUpload(e.target.files ? e.target.files[0] : null)} />
      {errors.image_url && <ErrorInput>{errors.image_url.message}</ErrorInput>}
      {profileImage && (
        <div className="ml-4 relative">
          <img src={URL.createObjectURL(profileImage)} alt="" width={100} className="rounded-lg border border-gray-300" />
          <button
            className="absolute top-0 right-0 w-6 h-6 rounded-full bg-red-500 text-white flex justify-center items-center"
            onClick={() => handleRemoveImage()}
          >
            X
          </button>
        </div>
      )}
    </div>
  </div>
</div>


      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="user-creation">Creación</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-between">
          <div className="lg:ml-4">
            <div className="mb-3">
            <Input id="start_date" type="date" {...register("updatedAt", { required: "Fecha de creacion" })} />
              {errors.updatedAt && <ErrorInput>{errors.updatedAt.message}</ErrorInput>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="user-observations">Observaciones</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-end">
          <div className="lg:ml-2 lg:w-1/2">
            <div className="mb-2 lg:w-full">
              <textarea
                id="observations"
                placeholder="Añadir observaciones..."
                {...register("observations")}
                rows={2} // Número de filas visible
                cols={80} // Número de columnas
                className="border rounded p-2 w-full"
              />
              {errors.observations && <ErrorInput>{errors.observations.message}</ErrorInput>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2">
      <Link href="/inicio/customers">
          <Button className="flex w-[150px] items-center gap-1 bg-gray-300">
            Cancelar
          </Button>
        </Link>
        <Button className="flex w-[150px] items-center gap-1" disabled={loading} type="submit">
          {loading ? <Spinner /> : <SaveIcon className="size-4" />} Guardar
        </Button>
      </div>
    </form>
  );
}

