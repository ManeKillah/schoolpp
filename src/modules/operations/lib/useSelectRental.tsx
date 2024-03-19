"use client";

import type {Package} from "@/@types/dto/package";
// import * as yup from "yup";
// import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "sonner";
import {CrossIcon} from "lucide-react";
import {useEffect, useState} from "react";

import useLoading from "@/shared/lib/loading";
import {useAccessToken} from "@/shared/lib/auth";

import createApi1 from "../../container/api";
import createApi2 from "../../project/api";
import createApi3 from "../../equipment/api";
import { Equipment } from "@/@types/dto/equipment";
import { Project } from "next/dist/build/swc";
import { Container } from "postcss";
import { Rental } from "@/@types/dto/rental";
// import { User } from "next-auth";

export type FormInputs = Rental;

export default function useSelectOperations() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [project, setProject] = useState<Project[]>([]);
  const [container, setContainer] = useState<Container[]>([]);

  const accessToken = useAccessToken();
  const api1 = createApi1(accessToken);
  const api2 = createApi2(accessToken);
  const api3 = createApi3(accessToken);

  async function getContainer() {
    // const api = createApi1(await getAccessToken());
    // let dataSelect = {users: {}, warehouses: {}}
    const {data, ...pagination} = await api1.container.list({});
    console.log('container', data);

    setContainer(data);
  }
  async function getProject() {
    // const api2 = createApi2(await getAccessToken());

    const {data, ...pagination} = await (await api2).project.list({});

    // console.log(data);
    setProject(data);
  }
  async function getEquipment() {
    // const api2 = createApi2(await getAccessToken());

    const {data, ...pagination} = await (await api3).equipment.list({});

    // console.log(data);
    setEquipment(data);
  }

  useEffect(() => {
    getContainer();
    getEquipment();
    getProject();
  }, []);

  return {
    container,
    project,
    equipment,
  };
}
