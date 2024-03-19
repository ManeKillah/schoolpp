"use client";

import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "sonner";
import {Cross} from "lucide-react";
import React from "react";

import useLoading from "@/shared/lib/loading";
import createApi from "@/modules/users/api";
import {type User} from "@/@types/dto/user";
import {useAccessToken} from "@/shared/lib/auth";

export type FormInputs = User;

export default function useUpdateAdmin(
  customer: User,
  props?: {onUpdate?: (customer: User) => void},
) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const accessToken = useAccessToken();

  const api = createApi(accessToken);

  const formMethods = useForm<FormInputs>({
    // resolver: yupResolver<FormInputs>(
    //   yup.object().shape({
    //     first_name: yup.string().required("Campo requerido"),
    //     last_name: yup.string().required("Campo requerido"),
    //     phone_country_code: yup.string().required("Campo requerido"),
    //     phone: yup.string().required("Campo requerido"),
    //     email: yup.string().email("Ingres un email válido").required("Campo requerido"),
    //   }),
    // ),
    defaultValues: {
      ...customer,
    },
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    if (loadingRef) return;
    console.log(data);

    // const admin = await api.admin.get(+1);

    setLoading(true);
    await api.admin
      .update(customer.id, data)
      .then((res) => {
        // formMethods.reset({...res});
        toast("Cliente actualizado correctamente.", {
          action: {
            label: "Undo",
            onClick: () => {
              // TODO
            },
          },
        });
        props?.onUpdate?.(res);
      })
      .catch((err: Error) => {
        toast("Error al actualizar el cliente.", {
          description: err.message,
          icon: <Cross className="rotate-45" />,
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
