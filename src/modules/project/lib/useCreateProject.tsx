"use client";

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
import { Project } from "@/@types/dto/project";
// import { Project } from "next/dist/build/swc";

export type FormInputs = Project;

export default function useCreateProject(props?: {onCreate?: (_project: Project) => void}) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const accessToken = useAccessToken();
  const api = createApi(accessToken);

  const formMethods = useForm<FormInputs>({
    defaultValues: {},
    // resolver: yupResolver<FormInputs>(yup.object().shape({})),
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    if (loadingRef) return;

    if (!data.reference.trim()) {
      toast("Debe proporcionar una referencia", {
        icon: <CrossIcon className="rotate-45 text-destructive" />,
      });
      return;
    }
    if (!data.name.trim()) {
      toast("Debe proporcionar un nombre", {
        icon: <CrossIcon className="rotate-45 text-destructive" />,
      });
      return;
    }

    setLoading(true);

    await api.project
      .create({...data,
        start_date: new Date(data.start_date),
        end_date: new Date(data.end_date),
        city_id: Number(data.city_id),
        village_id: Number(data.village_id),
        country_id: Number(data.country_id),
        })
      .then((res) => {
        formMethods.reset();
        toast("alquiler creado correctamente", {
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
        toast("Error al crear alquiler", {
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
