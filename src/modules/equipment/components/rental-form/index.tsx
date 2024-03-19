"use client";

import type {FormInputs} from "../../lib/useCreateEquipment";
import placeholderImage from '../../../../../public/placeholder.png';
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
import Link from "next/link";
import { Equipment } from "@/@types/dto/equipment";


export function EquipmentForm({
  errors,
  loading,
  control,
  register,
  onSubmit,
  users,
  equipments,
  packageId
}: {
  loading: boolean;
  errors: FieldErrors<FormInputs>;
  control: Control<FormInputs>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<FormInputs>;
  users?: any[] | any;
  equipments?: Equipment[] | any;
  packageId?: Package;
}) {

  const states = [{id: 'active', value: "Activo"}, {id: 'inactive', value: "Inactivo"}];
  const cities = [{id: '01', value: "Medellin"}, {id: '02', value: "Barranquilla"}];
  
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Informacion del Equipo</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-between">
          <div className="lg:ml-4">
            <div className="mb-3">
              <Label htmlFor="reference">Referencia</Label>
              <Input id="reference" type="text" {...register("reference_pre")} placeholder="re" />
              {errors.reference_pre ? <ErrorInput>{errors.reference_pre.message}</ErrorInput> : null}
            </div>
            <div className="mb-3">
              <Label htmlFor="reference">Nombre</Label>
              <Input id="name" type="text" {...register("name")} placeholder="Nombre" />
              {errors.name ? <ErrorInput>{errors.name.message}</ErrorInput> : null}
            </div>

          </div>
          <div className="lg:ml-4">
            <div className="mb-3">
              <Label htmlFor="last_name">ubicacion</Label>
              <Input id="last_name" placeholder="Ubicacion" {...register("location")} />
              {errors.location ? <ErrorInput>{errors.location.message}</ErrorInput> : null}
            </div>
            <div className="mb-3">
              <Label htmlFor="status">Equipos adicionales</Label>
              <select {...register('equipment_id')} >
                <option value="">Eliga un equipo..</option>
                {equipments.map((shop, index) => (
                  <option key={`shop-${index}`} value={shop.id}>
                    {shop.value}
                  </option>
                ))}
              </select>
              {errors.equipment_id && <ErrorInput>{errors.equipment_id.message}</ErrorInput>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Datos contables</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-between">
          <div className="lg:ml-4">
            <div className="mb-3 lg:w-48">
              <Input id="reference_con" type="text" {...register("reference_con")} placeholder="referencia contable" />
              {errors.reference_con ? <ErrorInput>{errors.reference_con.message}</ErrorInput> : null}
            </div>
          </div>
          <div className="lg:ml-4">
            <div className="mb-2 lg:w-48">
              <Input id="direction" placeholder="Importe" {...register("import")} />
              {errors.import ? <ErrorInput>{errors.import.message}</ErrorInput> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-end w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Datos de mantenimiento</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-end">
          <div className="lg:ml-2">
            <div className="mb-3">
              {/* <Label htmlFor="status">Estado</Label> */}
              <select {...register('status')} >
                <option value="">Eliga un estado..</option>
                {states.map((shop, index) => (
                  <option key={`shop-${index}`} value={shop.id}>
                    {shop.value}
                  </option>
                ))}
              </select>
              {/* {errors.status && <ErrorInput>{errors.status.message}</ErrorInput>} */}
            </div>
            <div className="mb-3">
              <Input id="start_date" type="date" {...register("out_date", { required: "Fecha de baja" })} />
              {errors.out_date && <ErrorInput>{errors.out_date.message}</ErrorInput>}
            </div>
          </div>
          <div className="lg:ml-2">
            <div className="mb-3">
              <Input id="start_date" type="date" {...register("review_date", { required: "Fecha control de revision" })} />
              {errors.review_date && <ErrorInput>{errors.review_date.message}</ErrorInput>}
            </div>
            <div className="mb-3">
              <Input id="start_date" type="date" {...register("in_date", { required: "Fecha de alta" })} />
              {errors.in_date && <ErrorInput>{errors.in_date.message}</ErrorInput>}
            </div>
          </div>
          <div className="w-full lg:w-auto flex flex-wrap justify-end">
          <div className="order-2 lg:order-1 lg:w-1/2 lg:ml-1">
            <div className="mb-2 lg:w-full">
              <textarea
                id="direction"
                placeholder="Motivo de baja"
                {...register("out_motive")}
                rows={1} // Número de filas visible
                cols={80} // Número de columnas
                className="border rounded p-2 w-full"
              />
              {errors.out_motive ? <ErrorInput>{errors.out_motive.message}</ErrorInput> : null}
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
        <Label className="text-lg font-bold" htmlFor="rental-info">Añadir imagen principal</Label>
        <div className="w-full lg:w-auto flex flex-wrap justify-between">
          <div className="lg:ml-4">
            <div className="mb-3">
              {/* <Input id="background_image" type="file" {...register("image_url")} /> */}
              {errors.image_url && <ErrorInput>{errors.image_url.message}</ErrorInput>}
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
      <Link href="/inicio/equipment">
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