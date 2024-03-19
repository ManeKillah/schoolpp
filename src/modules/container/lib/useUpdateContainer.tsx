"use client";

import type {BaseDto} from "@/@types/dto/base";
import type {Package} from "@/@types/dto/package";

import {useForm} from "react-hook-form";
// import * as yup from "yup";
// import {yupResolver} from "@hookform/resolvers/yup";
// import {useSession} from "next-auth/react";
import {toast} from "sonner";
import {Cross} from "lucide-react";

import useLoading from "@/shared/lib/loading";
// import createApi from "@/modules/packages/api";
import {useAccessToken} from "@/shared/lib/auth";
import { Rental } from "@/@types/dto/rental";
import createApi from "../api";
import { Container } from "@/@types/dto/container";

export default function useUpdateContainer(
  _container: Container,
  props?: {onUpdate?: (_container: Container) => void},
) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const accessToken = useAccessToken();

  const api = createApi(accessToken);

  const formMethods = useForm<Container>({
    defaultValues: _container,
    // resolver: yupResolver(yup.object().shape({})),
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    // console.log(data);
    if (loadingRef) return;
    // const {height, width, deletedAt, weight_lb, length,special_instructions,image_path, ...deletedData} = data

    setLoading(true);
    // const updatedata = {...data, 
    //   : Number(data.user_id),
    //   warehouse_id: Number(data.warehouse_id),
    //   ...(image_path !== null && { image_path })
    // }

    await api.container
      .update(_container.id, {...data,
        store_id: Number(data.store_id),
        equipment_id: Number(data.equipment_id),
        project_id: Number(data.project_id),
        review_date: new Date(data.review_date),
        out_date: new Date(data.in_date),
        in_date: new Date(data.in_date),
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
        props?.onUpdate?.(res);
      })
      .catch((err: Error) => {
        toast("Error al crear contenedor", {
          description: err.message,
          icon: <Cross className="rotate-45 text-destructive" />,
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
