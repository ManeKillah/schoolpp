"use client";

import type {FormInputs} from "../../lib/useCreateRental";
import placeholderImage from '../../../../../public/placeholder.png';
import {useState, type BaseSyntheticEvent} from "react";
import {Controller, type Control, type FieldErrors, type UseFormRegister} from "react-hook-form";

import {ChevronDownIcon, ChevronUpIcon, SaveIcon} from "lucide-react";

import {Input} from "@/shared/components/ui/input";
import {Label} from "@/shared/components/ui/label";
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
import { Equipment } from "@/@types/dto/equipment";
import { Project } from "@/@types/dto/project";
import { Container } from "@/@types/dto/container";

export function RentalForm({
  errors,
  loading,
  control,
  register,
  onSubmit,
  container,
  equipment,
  project,
}: {
  loading: boolean;
  errors: FieldErrors<FormInputs>;
  control: Control<FormInputs>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<FormInputs>;
  container?: Container[] | any[];
  equipment?: Equipment[];
  project?: Project[] | any[];
}) {
  const states = [ {id: 'active', value:"Activo"}, {id: 'inactive', value:"Inactivo"}];

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Informacion de alquiler</Label>
        <div className="w-full lg:w-auto flex flex-wrap">
  <div className="w-full lg:w-1/2 mb-3 lg:pr-2">
    <div className="mb-3">
      <Label htmlFor="reference">Referencia</Label>
      <Input id="reference" type="text" {...register("reference")} placeholder="ref:" />
      {errors.reference && <ErrorInput>{errors.reference.message}</ErrorInput>}
    </div>

    <div className="mb-3">
      <Label htmlFor="company">Compañia</Label>
      <Input id="company" placeholder="Compañia" {...register("company")} />
      {errors.company && <ErrorInput>{errors.company.message}</ErrorInput>}
    </div>

    {container && (
      <div className="mb-3">
        <Label htmlFor="container_id">Contenedor</Label>
        <select {...register('container_id')} >
          <option value="">Eliga un Contenedor..</option>
          {container.map((shop, index) => (
            <option key={`shop-${index}`} value={shop.id}>
              {shop.reference}
            </option>
          ))}
        </select>
        {errors.container_id && <ErrorInput>{errors.container_id.message}</ErrorInput>}
      </div>
    )}

    {project && (
      <div className="mb-3">
        <Label htmlFor="project_id">Projectos</Label>
        <select {...register('project_id')} >
          <option value="">Eliga un Projecto..</option>
          {project.map((shop, index) => (
            <option key={`shop-${index}`} value={shop.id}>
              {shop.reference}
            </option>
          ))}
        </select>
        {errors.project_id && <ErrorInput>{errors.project_id.message}</ErrorInput>}
      </div>
    )}
  </div>

  <div className="w-full lg:w-1/2 mb-3 lg:pl-2">
    {equipment && (
      <div className="mb-3">
        <Label htmlFor="equipment_id">Equipos</Label>
        <select {...register('equipment_id')} >
          <option value="">Eliga un equipo..</option>
          {equipment.map((shop, index) => (
            <option key={`shop-${index}`} value={shop.id}>
              {shop.reference}
            </option>
          ))}
        </select>
        {errors.equipment_id && <ErrorInput>{errors.equipment_id.message}</ErrorInput>}
      </div>
    )}

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
</div>

      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="duration">Duracion</Label>
        <div className="w-full lg:w-auto">
          <div className="mb-3">
            <Label htmlFor="start_date">Fecha de inicio</Label>
            <Input id="start_date" type="date" {...register("start_date", { required: "Seleccione una fecha" })} />
            {errors.start_date && <ErrorInput>{errors.start_date.message}</ErrorInput>}
          </div>

          <div className="mb-3">
            <Label htmlFor="end_date">Fecha de finalizacion</Label>
            <Input id="end_date" type="date" {...register("end_date", { required: "Seleccione una fecha" })} />
            {errors.end_date && <ErrorInput>{errors.end_date.message}</ErrorInput>}
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="duration">Observaciones</Label>
        <div className="w-full lg:w-auto">
        <div className="mb-4">
  {/* <Label htmlFor="description">Descripción</Label> */}
  <textarea
    id="description"
    // {...register("refere", { required: "Ingrese una descripción" })}
    placeholder="Añadir..."
    rows={4} // Número de filas visible
    cols={50} // Número de columnas
    className="border rounded p-2 w-full" // Clases para aplicar estilos
  />
  {errors.reference && <ErrorInput>{errors.reference.message}</ErrorInput>}
</div>


          
        </div>
      </div>

      <div className="flex justify-center">
        <Button className="flex w-[150px] items-center gap-1" disabled={loading} type="submit">
          {loading ? <Spinner /> : <SaveIcon className="size-4" />} Guardar
        </Button>
      </div>
    </form>
  );
}
