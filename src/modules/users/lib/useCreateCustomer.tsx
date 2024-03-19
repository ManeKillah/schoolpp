"use client";

import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {CrossIcon} from "lucide-react";
// import { createDBConnection } from "../../../app/(protected)/inicio/
// import axios from 'axios';

import useLoading from "@/shared/lib/loading";
import createApi from "@/modules/users/api";
import {type User} from "@/@types/dto/user";
import {UserRole, UserStatus} from "@/@types/enums";
import {useAccessToken} from "@/shared/lib/auth";
import { serverFuncuin } from "@/app/lib/actions";
// import { reject } from "lodash";
// import { resolve } from "path";

export type FormInputs = Pick<
  User,
  "first_name" | 'fileImage' | 'observations' | 'createdAt' | 'image_url' | 'role' | "phone_country_code" | "phone" | "email" | 'status' | 'password' | 'updatedAt'
>;

export default function useCreateCustomer(props?: {onCreate?: (user: User) => void}) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const accessToken = useAccessToken();
  const api = createApi(accessToken);

  const formMethods = useForm<FormInputs>({
    defaultValues: {
      phone_country_code: "+57",
    },
    // resolver: yupResolver<FormInputs>(
    //   yup.object().shape({
    //     first_name: yup.string().required("Campo requerido"),
    //     last_name: yup.string().required("Campo requerido"),
    //     phone_country_code: yup.string().required("Campo requerido"),
    //     phone: yup.string().required("Campo requerido"),
    //     fileImage: yup.object().required("Campo requerido"),
    //     email: yup.string().email("Ingres un email válido").required("Campo requerido"),
    //   }),
    // ),
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    if (loadingRef) return;
    console.log(data.fileImage[0].name);
    
    if(data.fileImage){

      const response = await fetch(
        `/api/avatar/upload?filename=user_images/${data.fileImage[0].name}`,
        {
          method: 'POST',
          body: data.fileImage[0],
        },
        );
        console.log(response);
      }

    setLoading(true);

    // await api.fileImage.create(data)

    await api.customer
      .create({
        ...data,
        role: UserRole.User,
        // status: ,
        updatedAt: new Date(data.updatedAt)
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
