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
import { Equipment } from "@/@types/dto/equipment";
import { Store } from "@/@types/dto/store";
// import { Container } from "postcss";

export type FormInputs = Store;

export default function useCreateStore(props?: {onCreate?: (_store: Store) => void}) {
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

    await api.store
      .create({...data, store_leader_id: Number(data.store_leader_id)})
      .then((res) => {
        formMethods.reset();
        toast("Almacen creado correctamente", {
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
        toast("Error al crear almacen", {
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
