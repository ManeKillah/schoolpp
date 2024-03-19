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
import {InputPhone} from "@/shared/components/ui/input-phone";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/shared/components/ui/select";

import { getAccessToken } from "@/shared/lib/auth";
import { Package } from "@/@types/dto/package";
import { FormInputs } from "../../lib/useCreateProject";
import Link from "next/link";


export function ProjectForm({
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

  const states = [ {id: 'active', value:"Activo"}, {id: 'inactive', value:"Inactivo"}];
  const cities = [ {id: '01', value:"Medellin"}, {id: '02', value:"Barranquilla"}];
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Informacion del proyecto</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-between">
          <div className="lg:ml-4">
          <div className="mb-3 lg:w-48">
            <Label htmlFor="reference">Referencia</Label>
            <Input id="reference" type="text" {...register("reference")} placeholder="ref:" />
            {errors.reference ? <ErrorInput>{errors.reference.message}</ErrorInput> : null}
          </div>

          <div className="mb-3 lg:w-48">
            <Label htmlFor="last_name">Nombre</Label>
            <Input id="last_name" placeholder="Compañia" {...register("name")} />
            {errors.name ? <ErrorInput>{errors.name.message}</ErrorInput> : null}
          </div>
          <div className="mb-3">
            <Label htmlFor="start_date">Fecha de inicio</Label>
            <Input id="start_date" type="date" {...register("start_date", { required: "Seleccione una fecha" })} />
            {errors.start_date && <ErrorInput>{errors.start_date.message}</ErrorInput>}
          </div>
          <div className="mb-3">
            <Label htmlFor="start_date">Fecha final</Label>
            <Input id="start_date" type="date" {...register("end_date", { required: "Seleccione una fecha" })} />
            {errors.end_date && <ErrorInput>{errors.end_date.message}</ErrorInput>}
          </div>
          </div>
          <div className="lg:ml-4">
          <div className="mb-2 lg:w-48">
            <Label htmlFor="direction">Direccion</Label>
            <Input id="direction" placeholder="Direccion" {...register("project_address")} />
            {errors.project_address ? <ErrorInput>{errors.project_address.message}</ErrorInput> : null}
          </div>

          <div className="mb-3 lg:w-48">
            <Label htmlFor="company">Compañia</Label>
            <Input id="company" placeholder="Compañia" {...register("company")} />
            {errors.company ? <ErrorInput>{errors.company.message}</ErrorInput> : null}
          </div>
          <div className="mb-3">
      <Label htmlFor="status">Estado</Label>
      <select {...register('status')} >
        <option value="">Eliga un estado..</option>
        {states.map((shop, index) => (
          <option key={`shop-${index}`} value={shop.id}>
            {shop.value}
          </option>
        ))}
      </select>
      {errors.status && <ErrorInput>{errors.status.message}</ErrorInput>}
          </div>
          </div>
          <div >
            {/* <div>
 
  <textarea
    id="observations"
   
    placeholder="description..."
    {...register("descripcion")}
    rows={4} // Número de filas visible
    cols={50} // Número de columnas
    className="border rounded p-2 w-full" // Clases para aplicar estilos
  />
  {errors.descripcion && <ErrorInput>{errors.descripcion.message}</ErrorInput>}
  </div> */}
</div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Datos de facturacion</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-between">
          <div className="lg:ml-4">
          <div className="mb-3 lg:w-48">
            <Label htmlFor="reference">CIF</Label>
            <Input id="CIF" type="text" {...register("CIF")} placeholder="CIF" />
            {errors.CIF ? <ErrorInput>{errors.CIF.message}</ErrorInput> : null}
          </div>

          <div className="mb-3">
      <Label htmlFor="status">Ciudad</Label>
      <select {...register('city_id')} >
        <option value="">Eliga una ciduda..</option>
        {cities.map((shop, index) => (
          <option key={`shop-${index}`} value={shop.id}>
            {shop.value}
          </option>
        ))}
      </select>
      {errors.city_id && <ErrorInput>{errors.city_id.message}</ErrorInput>}
    </div>
          <div className="mb-3">
      <Label htmlFor="status">Pais</Label>
      <select {...register('country_id')} >
        <option value="">Eliga un pais..</option>
        {cities.map((shop, index) => (
          <option key={`shop-${index}`} value={shop.id}>
            {shop.value}
          </option>
        ))}
      </select>
      {errors.country_id && <ErrorInput>{errors.country_id.message}</ErrorInput>}
    </div>
          <div className="mb-3">
            <Label htmlFor="start_date">Fecha de inicio</Label>
            <Input id="start_date" type="date" {...register("start_date", { required: "Seleccione una fecha" })} />
            {errors.start_date && <ErrorInput>{errors.start_date.message}</ErrorInput>}
          </div>
          <div className="mb-3">
            <Label htmlFor="start_date">Fecha final</Label>
            <Input id="start_date" type="date" {...register("end_date", { required: "Seleccione una fecha" })} />
            {errors.end_date && <ErrorInput>{errors.end_date.message}</ErrorInput>}
          </div>
          </div>
          <div className="lg:ml-4">
          <div className="mb-2 lg:w-48">
            <Label htmlFor="direction">Direccion</Label>
            <Input id="direction" placeholder="Direccion" {...register("billis_address")} />
            {errors.billis_address ? <ErrorInput>{errors.billis_address.message}</ErrorInput> : null}
          </div>
          <div className="mb-2 lg:w-48">
            <Label htmlFor="direction">Codigo Postal</Label>
            <Input id="direction" placeholder="Cod Postal" {...register("dane_code")} />
            {errors.dane_code ? <ErrorInput>{errors.dane_code.message}</ErrorInput> : null}
          </div>

          <div className="mb-3">
      <Label htmlFor="status">Provincia</Label>
      <select {...register('village_id')} >
        <option value="">Eliga un estado..</option>
        {cities.map((shop, index) => (
          <option key={`shop-${index}`} value={shop.id}>
            {shop.value}
          </option>
        ))}
      </select>
      {errors.village_id && <ErrorInput>{errors.village_id.message}</ErrorInput>}
    </div>
          <div className="mb-3">
      <Label htmlFor="status">Estado</Label>
      <select {...register('status')} >
        <option value="">Eliga un estado..</option>
        {states.map((shop, index) => (
          <option key={`shop-${index}`} value={shop.id}>
            {shop.value}
          </option>
        ))}
      </select>
      {errors.status && <ErrorInput>{errors.status.message}</ErrorInput>}
          </div>
          </div>
          <div >
            {/* <div>
 
  <textarea
    id="observations"
   
    placeholder="description..."
    {...register("descripcion")}
    rows={4} // Número de filas visible
    cols={50} // Número de columnas
    className="border rounded p-2 w-full" // Clases para aplicar estilos
  />
  {errors.descripcion && <ErrorInput>{errors.descripcion.message}</ErrorInput>}
  </div> */}
</div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Equipo operativo</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-between">
         
          <div className="lg:ml-2">
          <div className="mb-3 lg:w-48">
            <Label htmlFor="direction">Ejecutivo</Label>
            <Input id="direction" placeholder="Direccion Ejecutiva" {...register("ejecutive")} />
            {errors.ejecutive ? <ErrorInput>{errors.ejecutive.message}</ErrorInput> : null}
          </div>
          <div className="mb-3 lg:w-48">
            <Label htmlFor="direction">manager</Label>
            <Input id="direction" placeholder="Dirccion del Proyecto" {...register("project_manager")} />
            {errors.project_manager ? <ErrorInput>{errors.project_manager.message}</ErrorInput> : null}
          </div>
          <div className="mb-3 lg:w-58">
            <Label htmlFor="direction">manager</Label>
            <Input id="direction" placeholder="Jefe de Equipo" {...register("tean_leader")} />
            {errors.tean_leader ? <ErrorInput>{errors.tean_leader.message}</ErrorInput> : null}
          </div>

          
          
          </div>
          <div >
            {/* <div>
 
  <textarea
    id="observations"
   
    placeholder="description..."
    {...register("descripcion")}
    rows={4} // Número de filas visible
    cols={50} // Número de columnas
    className="border rounded p-2 w-full" // Clases para aplicar estilos
  />
  {errors.descripcion && <ErrorInput>{errors.descripcion.message}</ErrorInput>}
  </div> */}
</div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-end w-full mb-6">
  <Label className="text-lg font-bold" htmlFor="rental-info">Observaciones</Label>
  <div className="w-full lg:w-auto flex flex-wrap justify-end">
    <div className="order-2 lg:order-1 lg:w-1/2 lg:ml-1">
      <div className="mb-2 lg:w-full">
        {/* <Label htmlFor="direction">Ejecutivo</Label> */}
        <textarea
          id="direction"
          placeholder="Añadir..."
          {...register("observations")}
          rows={2} // Número de filas visible
          cols={80} // Número de columnas
          className="border rounded p-2 w-full" />
        {errors.observations ? <ErrorInput>{errors.observations.message}</ErrorInput> : null}
      </div>
    </div>
  </div>
</div>





      <div className="flex justify-center gap-2">
      <Link href="/inicio/project">
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

