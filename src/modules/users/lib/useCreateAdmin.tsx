"use client";

import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "sonner";
import {CrossIcon} from "lucide-react";

import useLoading from "@/shared/lib/loading";
import createApi from "@/modules/users/api";
import {type User} from "@/@types/dto/user";
import {UserRole, UserStatus} from "@/@types/enums";
import {useAccessToken} from "@/shared/lib/auth";

export type FormInputs = Pick<
  User,
  "first_name" | "last_name" | "phone_country_code" | "phone" | "email" 
>;

export default function useCreateAdmin(props?: {onCreate?: (user: User) => void}) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const accessToken = useAccessToken();
  const api = createApi(accessToken);

  const formMethods = useForm<FormInputs>({
    defaultValues: {
      phone_country_code: "+57",
    },
    resolver: yupResolver<FormInputs>(
      yup.object().shape({
        first_name: yup.string().required("Campo requerido"),
        last_name: yup.string().required("Campo requerido"),
        phone_country_code: yup.string().required("Campo requerido"),
        phone: yup.string().required("Campo requerido"),
        email: yup.string().email("Ingres un email válido").required("Campo requerido"),
      }),
    ),
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    if (loadingRef) return;

    setLoading(true);

    await api.admin
      .create({
        ...data,
        role: UserRole.Admin,
        status: UserStatus.Active,
      })
      .then((res) => {
        formMethods.reset();
        toast("Cliente creado correctamente", {
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
        toast("Error al crear cliente", {
          description: err.message,
          icon: <CrossIcon className="rotate-45 text-red-500" />,
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
