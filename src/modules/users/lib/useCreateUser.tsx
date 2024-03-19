"use client";

import type {BaseDto} from "@/@types/dto/base";

import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSession} from "next-auth/react";
import {toast} from "sonner";
import {Cross} from "lucide-react";

import useLoading from "@/shared/lib/loading";
import createApi from "@/modules/users/api";
import {type User} from "@/@types/dto/user";

export default function useCreateUser(props?: {onCreate?: (user: User) => void}) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const api = createApi();

  const formMethods = useForm<Omit<User, keyof BaseDto>>({
    defaultValues: {},
    // resolver: yupResolver(
    //   yup.object().shape({
    //     first_name: yup.string(),
    //     last_name: yup.string(),
    //   }),
    // ),
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    if (loadingRef) return;

    setLoading(true);

    (await api).customer
      .create(data)
      .then((res) => {
        formMethods.reset();
        toast("User has been created.", {
          action: {
            label: "Undo",
            onClick: () => {
              // TODO
            },
          },
        });
        props?.onCreate?.(res);
      })
      .catch((err: Error) => {
        toast("User creation error", {
          description: err.message,
          icon: <Cross />,
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
