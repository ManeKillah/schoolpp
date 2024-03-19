"use client";

import type {Package} from "@/@types/dto/package";

import {useForm} from "react-hook-form";
// import * as yup from "yup";
// import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "sonner";
import {CrossIcon} from "lucide-react";

import useLoading from "@/shared/lib/loading";
// import createApi from "@/modules/packages/api";
import {useAccessToken} from "@/shared/lib/auth";
import { Rental } from "@/@types/dto/rental";
import createApi from "../api";

export type FormInputs = Rental;

export default function useCreateRental(props?: {onCreate?: (_package: Rental) => void}) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const accessToken = useAccessToken();
  const api = createApi(accessToken);

  const formMethods = useForm<FormInputs>({
    defaultValues: {},
    // resolver: yupResolver<FormInputs>(yup.object().shape({})),
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    if (loadingRef) return;

    // console.log(data);

    // return

    setLoading(true);

    await api.rental
      .create({...data,
         container_id: Number(data.container_id),
         equipment_id: Number(data.equipment_id),
         project_id: Number(data.project_id),
        })
      .then((res) => {
        formMethods.reset();
        toast("alquiler creado correctamente", {
          action: {
            label: "Cerrar",
            onClick: () => {
              // TODO
            },
          },
        });
        props?.onCreate?.(res);
      })
      .catch((err: Error) => {
        toast("Error al crear alquiler", {
          description: err.message,
          icon: <CrossIcon className="rotate-45 text-destructive" />,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return {
    loading,
    formMethods,
    handleSubmit,
  };
}
