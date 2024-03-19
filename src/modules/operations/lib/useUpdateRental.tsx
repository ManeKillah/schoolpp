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

export default function useUpdateRental(
  _package: Rental,
  props?: {onUpdate?: (_package: Rental) => void},
) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const accessToken = useAccessToken();

  const api = createApi(accessToken);

  const formMethods = useForm<Rental>({
    defaultValues: _package,
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

    await api.rental
      .update(_package.id, data)
      .then((res) => {
        formMethods.reset();
        toast("Alquiler creado correctamente", {
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
        toast("Error al crear paquete", {
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
