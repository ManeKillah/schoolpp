"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Slider from "react-slick";
// import { store } from "@/@types/dto/store";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Label } from "@/shared/components/ui/label";
// import useSelectstore from "../lib/useSelectstore";
// import { store } from "@/@types/dto/store";
import { Store } from "@/@types/dto/store";
import useSelectStore from "../lib/useSelectStore";

export default function StoreDetails({ store }: { store: Store }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  
  const {observations, users} = useSelectStore(store.reference);
  const filteredUser = users.find(user => user.id === store.store_leader_id);
  const fileImages: any = []

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleBack = () => {
    router.back();
  };

  // console.log( typeof store.start_date, store.start_date);

  return (
    <div>
      {/* <div className="mb-4">
        <button onClick={handleBack}>Back</button>
      </div> */}
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
      <TabList style={{ display: "flex", gap: "10px" }}>
          <Tab style={{ flex: 1, border: "1px solid #ccc", borderRadius: "10px", padding: "10px", textAlign: "center", fontWeight: "bold" }}>Información</Tab>
          <Tab style={{ flex: 1, border: "1px solid #ccc", borderRadius: "10px", padding: "10px", textAlign: "center", fontWeight: "bold" }}>Alquileres Asignados</Tab>
          <Tab style={{ flex: 1, border: "1px solid #ccc", borderRadius: "10px", padding: "10px", textAlign: "center", fontWeight: "bold" }}>Galería</Tab>
          <Tab style={{ flex: 1, border: "1px solid #ccc", borderRadius: "10px", padding: "10px", textAlign: "center", fontWeight: "bold" }}>Observaciones</Tab>
        </TabList>

        <TabPanel>
        <div>
  <div className="section">
    <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
      <Label className="text-lg font-bold mb-3 lg:w-1/4" htmlFor="store-info">
        General
      </Label>
      <div className="w-full lg:w-auto flex flex-wrap">
        <div className="w-full lg:w-1/2 mb-3 flex items-center">
          <div className="w-1/2">
            <Label htmlFor="reference" className="font-bold">
              Nombre del almacén:
            </Label>
          </div>
          <div className="w-1/2">
            <Label htmlFor="reference">{store.name}</Label>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mb-3 flex items-center">
          <div className="w-1/2">
            <Label htmlFor="location" className="font-bold">
              Ubicación:
            </Label>
          </div>
          <div className="w-1/2">
            <Label htmlFor="location">{store.location}</Label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="section">
    <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
      <Label className="text-lg font-bold mb-3 lg:w-1/4" htmlFor="store-info">
        Equipo operativo
      </Label>
      <div className="w-full lg:w-auto flex flex-wrap">
        <div className="w-full lg:w-1/4 mb-3 lg:pr-4 flex items-center mb-2">
          <div className="w-3/2 pr-2">
            <Label htmlFor="reference" className="font-bold">
              Jefe de almacén:
            </Label>
          </div>
          <div className="w-3/4">
            <div className="flex items-center mb-6">
              {/* Imagen de perfil (deberías reemplazar la URL de la imagen y el tamaño según tus necesidades) */}
              <img src="/user_man.jpeg" alt="Imagen de perfil" className="rounded-full h-16 w-16 mr-4" />

              {/* Información del usuario (nombre y correo) */}
              <div>
                <div className="text-lg font-bold text-sm">{filteredUser?.first_name}</div>
                <div className="text-sm">{filteredUser?.email}</div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="section">
    <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
      <Label className="text-lg font-bold" htmlFor="store-info">Descripción</Label>
      <div className="w-full lg:w-auto flex flex-wrap border rounded-lg" style={{ width: '300px', height: '100px' }}>
        <div className="w-full lg:pr-2">
          <div className="mb-3">
            <Label>{store.description}</Label>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


        </TabPanel>
        <TabPanel>
          <h3>hello1</h3>
          <h3>hello2</h3>
          {/* <Associatedstores storeId={store.id} /> */}
        </TabPanel>
        <TabPanel>
        <h3>Galeria</h3>
          <Slider dots={true}>
            {fileImages.map((file: any, index: any) => (
              <div key={index}>
                <img src={file.url} alt={`Image ${index}`} />
              </div>
            ))}
          </Slider>
        </TabPanel>
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
