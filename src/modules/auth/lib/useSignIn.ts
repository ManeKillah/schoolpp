"use client";

import {useForm} from "react-hook-form";
import * as yup from "yup";
import {signIn} from "next-auth/react";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter, useSearchParams} from "next/navigation";

import useLoading from "@/shared/lib/loading";

export interface FormValues {
  email: string;
  password: string;
}

export default function useSignIn() {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    formState: {errors},
    setError,
    register,
    handleSubmit: onSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email("Type a valid email").required("This field is required"),
        password: yup.string().required("This field is required"),
      }),
    ),
  });

  const handleSubmit = onSubmit(async (data) => {
    if (loadingRef) return;

    setLoading(true);

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          const redirectUrl = searchParams.get("redirectUrl");

          router.push(decodeURI(redirectUrl ?? "") || "/");

          return;
        }

        console.log(res);

        if (res?.error === "Invalid login") {
          setError("root", {
            message: "Invalid credentials",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return {
    loading,
    errors,
    register,
    handleSubmit,
  };
}
