"use client";

import type {Package} from "@/@types/dto/package";
import type {User} from "@/@types/dto/user";
// import type Warehouse from "@/@types/dto/warehouse";

import {useEffect, useState} from "react";

import useLoading from "@/shared/lib/loading";
import {useAccessToken} from "@/shared/lib/auth";

import createApi1 from "../../users/api";
import createApi2 from "../../rental/api";
import createApi3 from "../../locations/api";
import { Store } from "@/@types/dto/store";
import { Observations } from "@/@types/dto/observations";
import { City } from "@/@types/dto/city";
// import { User } from "next-auth";

export type FormInputs = Store;

export default function useSelectStore(observationRef?: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [observations, setObservations] = useState<Observations[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const accessToken = useAccessToken();
  const api1 = createApi1(accessToken);
  const api2 = createApi2(accessToken);
  const api3 = createApi3(accessToken);

  async function getUsers() {
    // const api = createApi1(await getAccessToken());
    // let dataSelect = {users: {}, warehouses: {}}
    const {data, ...pagination} = await api1.customer.list({});
    console.log(data);
    setUsers(data);
  }
  async function getObservaciones(ref: string) {
    // const api2 = createApi2(await getAccessToken());

    const {data, ...pagination} = await (await api2).observations.list({search: ref});

    // console.log(data);
    setObservations(data);
  }
  async function getCities() {
    // const api2 = createApi2(await getAccessToken());

    const {data, ...pagination} = await (await api3).cities.list({});

    // console.log(data);
    setCities(data);
  }

  useEffect(() => {
    getUsers();
    getCities();
    getObservaciones(observationRef ?? "");
  }, []);

  return {
    users,
    observations,
    cities,
  };
}
