"use client";

import {useEffect, useState} from "react";

import useLoading from "@/shared/lib/loading";
import {useAccessToken} from "@/shared/lib/auth";

import createApi1 from "../../container/api";
import createApi2 from "../../project/api";
import createApi3 from "../../equipment/api";
import createApi4 from "../api";
import { Equipment } from "@/@types/dto/equipment";
import { Rental } from "@/@types/dto/rental";
import { Project } from "@/@types/dto/project";
import { Container } from "@/@types/dto/container";
import { Observations } from "@/@types/dto/observations";



export type FormInputs = Rental;

export default function useSelectRental(observationRef?: string) {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [project, setProject] = useState<Project[]>([]);
  const [container, setContainer] = useState<Container[]>([]);
  const [observations, setObservations] = useState<Observations[]>([]);

  const accessToken = useAccessToken();
  // console.log('acces token', accessToken);
  const api1 = createApi1(accessToken);
  const api2 = createApi2(accessToken);
  const api3 = createApi3(accessToken);
  const api4 = createApi4(accessToken);

  async function getContainer() {
    // const api = createApi1(await getAccessToken());
    // let dataSelect = {users: {}, warehouses: {}}
    // console.log('container');
    // try{

      let {data, ...pagination} = await api1.container.list({});
      console.log('container', data);
    // }catch (error){
    //   console.log(error);
    // }

    setContainer(data);
    // console.log(container);
  }
  async function getProject() {
    // const api2 = createApi2(await getAccessToken());

    const {data, ...pagination} = await api2.project.list({});

    // console.log(data);
    setProject(data);
  }
  async function getEquipment() {
    // const api2 = createApi2(await getAccessToken());

    const {data, ...pagination} = await (await api3).equipment.list({});

    // console.log(data);
    setEquipment(data);
  }
  async function getObservations(referece: string) {
    // const api2 = createApi2(await getAccessToken());

    const {data, ...pagination} = await (await api4).observations.list({search: referece});

    // console.log(data);
    setObservations(data);
  }

  useEffect(() => {
    console.log('object');
    getContainer();
    getEquipment();
    getProject();
    getObservations(observationRef ?? "")
    console.log('object');
  }, []);

  return {
    container,
    project,
    equipment,
    observations,
  };
}
