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
import { Container } from "@/@types/dto/container";
// import { Container } from "postcss";

export type FormInputs = Container;

export default function useCreateContainer(props?: {onCreate?: (_container: Container) => void}) {
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

    await api.container
      .create({...data,
         store_id: Number(data.store_id),
         equipment_id: Number(data.equipment_id),
         project_id: Number(data.project_id),
         review_date: new Date(data.review_date),
         out_date: new Date(data.in_date),
         in_date: new Date(data.in_date),
        //  image_url = ,
        })
      .then((res) => {
        formMethods.reset();
        toast("contenedor creado correctamente", {
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
        toast("Error al crear contenedor", {
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
