"use client";

import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "sonner";
import {CrossIcon} from "lucide-react";

import useLoading from "@/shared/lib/loading";
import createApi from "@/modules/users/api";
import {type User} from "@/@types/dto/user";
// import {UserRole, UserStatus} from "@/@types/enums";
import {useAccessToken} from "@/shared/lib/auth";
import { Address } from "@/@types/dto/address";
import { serverFuncuin } from "@/app/lib/actions";

export type FormInputs = Pick<
  Address,
  "address_line1" | "address_line2" | "city" | "country_iso_code" | "user_id"
>;

export default function useCreateAddress(props?: {onCreate?: (address: Address) => void}) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const accessToken = useAccessToken();
  const api = createApi(accessToken);

  const formMethods = useForm<FormInputs>({
    defaultValues: {
      // phone_country_code: "+57",
    },
    resolver: yupResolver<FormInputs>(
      yup.object().shape({
        address_line1: yup.string().required("Campo requerido"),
        address_line2: yup.string().required("Campo requerido"),
        city: yup.string().required("Campo requerido"),
        country_iso_code: yup.string().required("Campo requerido"),
        user_id: yup.number().required("Campo requerido"),
      }),
    ),
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    if (loadingRef) return;
    // serverFuncuin(data.fileImage)
    setLoading(true);

    await api.customer.addresses
      .create({
        ...data,
        // role: UserRole.User,
        // status: UserStatus.Active,
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
