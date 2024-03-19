"use client";

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
import { Store } from "@/@types/dto/store";

export default function useUpdateStore(
  _store: Store,
  props?: {onUpdate?: (_store: Store) => void},
) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const accessToken = useAccessToken();

  const api = createApi(accessToken);

  const formMethods = useForm<Store>({
    defaultValues: _store,
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

    await api.store
      .update(_store.id, data)
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
        props?.onUpdate?.(res);
      })
      .catch((err: Error) => {
        toast("Error al crear almacen", {
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
