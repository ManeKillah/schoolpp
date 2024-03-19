"use client";


import {useState, type BaseSyntheticEvent} from "react";
import {Controller, type Control, type FieldErrors, type UseFormRegister} from "react-hook-form";

import {ChevronDownIcon, ChevronUpIcon, SaveIcon} from "lucide-react";

import {Input} from "@/shared/components/ui/input";
import {Label} from "@/shared/components/ui/label";
// import {Select} from "@/shared/components/ui/select";
import {ErrorInput} from "@/shared/components/ui/input-error";
import { FileUPload } from '@/modules/uploadS3/components/upLoadS3';
import {Button} from "@/shared/components/ui/button";
import Spinner from "@/shared/components/ui/spinner";

import { Package } from "@/@types/dto/package";
import { FormInputs } from "../../lib/useCreateStore";
import Link from "next/link";
import { User } from "@/@types/dto/user";


export function StoreForm({
  errors,
  loading,
  control,
  register,
  onSubmit,
  users,
  packageId
}: {
  loading: boolean;
  errors: FieldErrors<FormInputs>;
  control: Control<FormInputs>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<FormInputs>;
  users?: any[] | any;
  packageId?: Package;
}) {

  const states = [{id: 'active', value: "Activo"}, {id: 'inactive', value: "Inactivo"}];
  const cities = [{id: '01', value: "Medellin"}, {id: '02', value: "Barranquilla"}];
  
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Informacion del Almacen</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-between">
          <div className="lg:ml-4">
            <div className="mb-3">
              {/* <Label htmlFor="reference">Referencia</Label> */}
              <Input id="reference" type="text" {...register("reference")} placeholder="referencia" />
              {errors.reference ? <ErrorInput>{errors.reference.message}</ErrorInput> : null}
            </div>
            <div className="mb-3">
              {/* <Label htmlFor="reference">Referencia</Label> */}
              <Input id="name" type="text" {...register("name")} placeholder="Nombre" />
              {errors.name ? <ErrorInput>{errors.name.message}</ErrorInput> : null}
            </div>

          </div>
          <div className="lg:ml-4">
            <div className="mb-3">
              {/* <Label htmlFor="last_name">ubicacion</Label> */}
              <Input id="last_name" placeholder="Ubicacion" {...register("location")} />
              {errors.location ? <ErrorInput>{errors.location.message}</ErrorInput> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Equipo Operativo</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-between">
          <div className="lg:ml-4">
            <div className="mb-3 lg:w-48">
            <select {...register('store_leader_id')} >
              <option value="">Jefe de almacen..</option>
              {users.map((user: User, index: number) => (
                <option key={`shop-${index}`} value={user.id}>
                  {user.first_name}
                </option>
              ))}
            </select>
              {errors.store_leader_id ? <ErrorInput>{errors.store_leader_id.message}</ErrorInput> : null}
            </div>
          </div>
          
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-end w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Observaciones</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-end">
          <div className="order-2 lg:order-1 lg:w-1/2 lg:ml-1">
            <div className="mb-2 lg:w-full">
              <textarea
                id="direction"
                placeholder="Añadir..."
                {...register("observations")}
                rows={2} // Número de filas visible
                cols={80} // Número de columnas
                className="border rounded p-2 w-full"
              />
              {errors.observations ? <ErrorInput>{errors.observations.message}</ErrorInput> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2">
      <Link href="/inicio/store">
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
