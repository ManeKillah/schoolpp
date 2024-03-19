"use client";

import type {Package} from "@/@types/dto/package";
import type {User} from "@/@types/dto/user";
// import type Warehouse from "@/@types/dto/warehouse";

import {useForm} from "react-hook-form";
// import * as yup from "yup";
// import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "sonner";
import {CrossIcon} from "lucide-react";
import {useEffect, useState} from "react";

import useLoading from "@/shared/lib/loading";
import {useAccessToken} from "@/shared/lib/auth";

import createApi1 from "../../users/api";
import createApi2 from "../../rental/api";
import createApi3 from "../../equipment/api";
import { Observations } from "@/@types/dto/observations";
import { Equipment } from "@/@types/dto/equipment";
// import { User } from "next-auth";

export type FormInputs = Package;

export default function useSelectEquipment(observationRef?: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [observations, setObservations] = useState<Observations[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);

  const accessToken = useAccessToken();
  const api1 = createApi1(accessToken);
  const api2 = createApi2(accessToken);
  const api3 = createApi3(accessToken);


  async function getUsers() {
    // const api = createApi1(await getAccessToken());
    // let dataSelect = {users: {}, warehouses: {}}
    const {data, ...pagination} = await api1.customer.list({});

    setUsers(data);
  }
  async function getEquipments() {
    // const api = createApi1(await getAccessToken());
    // let dataSelect = {users: {}, warehouses: {}}
    const {data, ...pagination} = await api3.equipment.list({});

    setEquipments(data);
  }
  async function getObservaciones(ref: string) {
    // const api2 = createApi2(await getAccessToken());

    const {data, ...pagination} = await (await api2).observations.list({search: ref});

    // console.log(data);
    setObservations(data);
  }

  useEffect(() => {
    getUsers();
    getEquipments();
    getObservaciones(observationRef ?? "");
  }, []);

  return {
    users,
    equipments,
    observations,
  };
}
