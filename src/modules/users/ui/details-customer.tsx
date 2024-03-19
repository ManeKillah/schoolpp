"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Slider from "react-slick";
// import { customer } from "@/@types/dto/customer";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Label } from "@/shared/components/ui/label";
import { User } from "@/@types/dto/user";
import useSelectCustomer from "../lib/useSelectCustomer";

export default function CustomerDetails({ customer }: { customer: User }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const {observations} = useSelectCustomer(customer.reference ?? "");
  // console.log({observations}, customer.reference);
  const fileImages: any = []

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleBack = () => {
    router.back();
  };

  // console.log( typeof customer.start_date, customer.start_date);

  return (
    <div>
      {/* <div className="mb-4">
        <button onClick={handleBack}>Back</button>
      </div> */}
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
      <TabList style={{ display: "flex", gap: "10px" }}>
          <Tab style={{ flex: 1, border: "1px solid #ccc", borderRadius: "10px", padding: "10px", textAlign: "center", fontWeight: "bold" }}>Información</Tab>
          <Tab style={{ flex: 1, border: "1px solid #ccc", borderRadius: "10px", padding: "10px", textAlign: "center", fontWeight: "bold" }}>Estadisticas</Tab>
          {/* <Tab style={{ flex: 1, border: "1px solid #ccc", borderRadius: "10px", padding: "10px", textAlign: "center", fontWeight: "bold" }}>Galería</Tab> */}
          <Tab style={{ flex: 1, border: "1px solid #ccc", borderRadius: "10px", padding: "10px", textAlign: "center", fontWeight: "bold" }}>Observaciones</Tab>
        </TabList>

        <TabPanel>
        <div className="section flex items-center mb-6">
      {/* Imagen de perfil (deberías reemplazar la URL de la imagen y el tamaño según tus necesidades) */}
      <img src="/user_man.jpeg" alt="Imagen de perfil" className="rounded-full h-16 w-16 mr-4" />

      {/* Información del usuario (nombre y correo) */}
      <div>
        <div className="text-lg font-bold text-sm">{customer.first_name}</div>
        <div className="text-sm">{customer.email}</div>
      </div>

      {/* Botón para enviar mensajes al usuario */}
      <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Enviar Mensaje
      </button>
    </div>
        <div>
          <div className="section">
            <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
              <Label className="text-lg font-bold" htmlFor="customer-info">General</Label>
              <div className="w-full lg:w-auto flex flex-wrap ml-4">
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/4 pr-2">
                  <Label htmlFor="reference" className="font-bold">Nombre:</Label>
                {/* </div>
                <div className="w-1/2"> */}
                  <Label htmlFor="reference"> {customer.first_name}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Email:</Label>
                {/* </div>
                <div className="w-1/2"> */}
                  <Label htmlFor="reference"> {customer.email}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/4 pr-2">
                  <Label htmlFor="reference" className="font-bold">Estado:</Label>
                {/* </div>
                <div className="w-1/2"> */}
                  <Label htmlFor="reference"> {customer.status}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/4 pr-2">
                  <Label htmlFor="reference" className="font-bold">Rol:</Label>
                {/* </div>
                <div className="w-1/2"> */}
                  <Label htmlFor="reference"> {customer.role}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/4 pr-2">
                  <Label htmlFor="reference" className="font-bold">fecha de Alta:</Label>
                {/* </div>
                <div className="w-1/2"> */}
                  <Label htmlFor="reference"> {(customer.createdAt)}</Label>
                </div>
              </div>
            </div>

            </div>
          </div>
        
          <div className="section">
            <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
              <Label className="text-lg font-bold" htmlFor="customer-info">Descripcion</Label>
              <div className="w-full lg:w-auto flex flex-wrap border rounded-lg p-4" style={{ width: '300px', height: '100px' }}>
                  <div className="w-full lg:pr-2">
                    <div className="mb-3">
                      <Label>{customer.description}</Label>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        </TabPanel>
        <TabPanel>
          <h3>Pendiente</h3>
          <h3>Pendiente</h3>
          {/* <Associatedcustomers customerId={customer.id} /> */}
        </TabPanel>
        {/* <TabPanel>
        <h3>Galeria</h3>
          <Slider dots={true}>
            {fileImages.map((file: any, index: any) => (
              <div key={index}>
                <img src={file.url} alt={`Image ${index}`} />
              </div>
            ))}
          </Slider>
        </TabPanel> */}
        <TabPanel>
            {
              observations && observations.map((observation: any) => (
                <div key={observation.id} className="section">
                  <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
                    <Label className="text-lg font-bold" htmlFor="customer-info">Observacion #{observation.id}</Label>
                    <div className="w-full lg:w-auto flex flex-wrap border rounded-lg p-4" style={{ width: '300px', height: '100px' }}>
                      <div className="w-full lg:pr-2">
                        <div className="mb-3">
                          <Label>{observation.message}</Label>
                        </div>
                        <div className="text-sm text-gray-500">{new Date(observation.creation_date).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
            {/* <Associatedcustomers customerId={customer.id} /> */}
            <div></div>
          </TabPanel>

      
      </Tabs>
    </div>
  );
}
