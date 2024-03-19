"use client";

import type {FormInputs} from "../../lib/useCreateCustomer";
import {useState, type BaseSyntheticEvent} from "react";
import type {Control, FieldErrors, UseFormRegister} from "react-hook-form";

import {CloudIcon, MailIcon, PhoneIcon, SaveIcon, UserIcon} from "lucide-react";

import {Input} from "@/shared/components/ui/input";
import {Label} from "@/shared/components/ui/label";
import {ErrorInput} from "@/shared/components/ui/input-error";
import {Button} from "@/shared/components/ui/button";
import Spinner from "@/shared/components/ui/spinner";
import {InputPhone} from "@/shared/components/ui/input-phone";
import Link from "next/link";



export function AdminsForm({
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
  const [profileImage, setProfileImage] = useState<File | null>(null);

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
      {/* Cover Picture */}
      <div className="relative w-full bg-gray-400 h-[200px] mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/fondo.jpg)', filter: 'blur(5px)' }}></div>
        <div className="absolute inset-0 bg-gray-400 bg-opacity-50"></div>
        <div className="absolute bottom-0 left-0 ml-4 mb-4">
          {/* Profile Picture */}
          <div className="relative w-32 h-32 bg-gray-200 rounded-full overflow-hidden z-10 flex items-center justify-center">
            <img
              src='/user_women.jpeg'
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Section Separator */}
      <hr className="w-full border-gray-300 border mb-6" />


      {/* Rental Info Section */}
      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Nombre</Label>
        <div className="w-full lg:w-96 lg:ml-4">
        <div className="mb-3 flex">
            <span className="mr-2 flex-shrink-0">
              <UserIcon />
            </span>
            <Input id="name" type="text" {...register("first_name")} placeholder="Nombre" className="w-full" />
          </div>
          {errors.first_name ? <ErrorInput>{errors.first_name.message}</ErrorInput> : null}
        
        </div>
      </div>
      <hr className="w-full border-gray-300 border mb-6" />

      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Correo Electronico</Label>
        <div className="w-full lg:w-96 lg:ml-4">
        <div className="mb-3 flex">
            <span className="mr-2 flex-shrink-0">
              <MailIcon />
            </span>
            <Input id="email" type="text" {...register("email")} placeholder="Correo" className="w-full" />
          </div>
          {errors.email ? <ErrorInput>{errors.email.message}</ErrorInput> : null}
        
        </div>
      </div>
      <hr className="w-full border-gray-300 border mb-6" />

      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Numero de contacto</Label>
        <div className="w-full lg:w-96 lg:ml-4">
        <div className="mb-3 flex">
            <span className="mr-2 flex-shrink-0">
              <PhoneIcon />
            </span>
            <Input id="phone" type="text" {...register("phone")} placeholder="Tele" className="w-full" />
          </div>
          {errors.phone ? <ErrorInput>{errors.phone.message}</ErrorInput> : null}
        
        </div>
      </div>
      <hr className="w-full border-gray-300 border mb-6" />

      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">
          <span className="flex items-center">
            <UserIcon className="mr-2" /> Seguridad
          </span>
        </Label>
        <div className="w-full lg:w-96 lg:ml-4">
        <div className="mb-3 flex">
            
            <Label htmlFor="current_password" className="sr-only">Contraseña actual</Label>
            <Input id="current_password" type="password" {...register("password")} placeholder="Contraseña actual" className="w-full" />
            {errors.password ? <ErrorInput>{errors.password.message}</ErrorInput> : null}
          </div>
          {/* Nueva contraseña */}
          <div className="mb-3 flex">
           
            <Label htmlFor="new_password" className="sr-only">Nueva contraseña</Label>
            <Input id="new_password" type="password" {...register("password")} placeholder="Nueva contraseña" className="w-full" />
            {errors.password ? <ErrorInput>{errors.password.message}</ErrorInput> : null}
          </div>
          {/* Confirmar nueva contraseña */}
          <div className="mb-3 flex">
            
            <Label htmlFor="confirm_password" className="sr-only">Confirmar nueva contraseña</Label>
            <Input id="confirm_password" type="password" {...register("password")} placeholder="Confirmar nueva contraseña" className="w-full" />
            {errors.password ? <ErrorInput>{errors.password.message}</ErrorInput> : null}
          </div>
        </div>
      </div>
      

      {/* Submit Button */}
      <div className="flex justify-center gap-2">
      <Link href="/settings/admins">
          <Button className="flex w-[150px] items-center gap-1 bg-gray-300">
            Cancelar
          </Button>
        </Link>
        <Button className="flex w-[150px] items-center gap-1" disabled={loading} type="submit">
          {/* {loading ? <Spinner /> : <SaveIcon className="size-4" />}  */}
          Guardar
        </Button>
      </div>
    </form>
  );
}




