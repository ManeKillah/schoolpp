"use client";

import type {Package} from "@/@types/dto/package";
import type {User} from "@/@types/dto/user";

import {useForm} from "react-hook-form";
// import * as yup from "yup";
// import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "sonner";
import {CrossIcon} from "lucide-react";
import {useEffect, useState} from "react";

import useLoading from "@/shared/lib/loading";
import {useAccessToken} from "@/shared/lib/auth";

import createApi1 from "../../users/api";
import createApiPro from "../../project/api";
import createApiEqu from "../../equipment/api";
import createApi2 from "../../rental/api";
import createApi3 from "../../store/api";
import createApiCity from "../../locations/api";
import { Observations } from "@/@types/dto/observations";
import { Store } from "@/@types/dto/store";
import { Container } from "@/@types/dto/container";
import { Equipment } from "@/@types/dto/equipment";
import { Project } from "@/@types/dto/project";
import { City } from "@/@types/dto/city";
// import { Container } from "postcss";
// import { User } from "next-auth";

export type FormInputs = Container;

export default function useSelectContainer(observationRef?: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [observations, setObservations] = useState<Observations[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const accessToken = useAccessToken();
  const api1 = createApi1(accessToken);
  const api2 = createApi2(accessToken);
  const api3 = createApi3(accessToken);
  const apiEqu = createApiEqu(accessToken);
  const apiPro = createApiPro(accessToken);
  const apiCity = createApiCity(accessToken);

  async function getUsers() {
    // const api = createApi1(await getAccessToken());
    // let dataSelect = {users: {}, warehouses: {}}
    const {data, ...pagination} = await api1.customer.list({});

    setUsers(data);
  }
  async function getProjects() {
    // const api = createApi1(await getAccessToken());
    // let dataSelect = {users: {}, warehouses: {}}
    const {data, ...pagination} = await apiPro.project.list({});

    setProjects(data);
  }
  async function getCities() {
    // const api = createApi1(await getAccessToken());
    // let dataSelect = {users: {}, warehouses: {}}
    const {data, ...pagination} = await apiCity.cities.list({});

    setCities(data);
  }
  async function getEquipments() {
    // const api = createApi1(await getAccessToken());
    // let dataSelect = {users: {}, warehouses: {}}
    const {data, ...pagination} = await apiEqu.equipment.list({});

    setEquipments(data);
  }
  async function getObservations(referece: string) {
    // const api2 = createApi2(await getAccessToken());

    const {data, ...pagination} = await (await api2).observations.list({search: referece});

    // console.log(data);
    setObservations(data);
  }
  async function getStores() {
    // const api2 = createApi2(await getAccessToken());

    const {data, ...pagination} = await (await api3).store.list({});

    // console.log(data);
    setStores(data);
  }

  useEffect(() => {
    getUsers();
    getEquipments();
    getProjects();
    getCities();
    getObservations(observationRef ?? '');
    getStores();
  }, []);

  return {
    users,
    observations,
    stores,
    projects,
    equipments,
    cities,
  };
}
