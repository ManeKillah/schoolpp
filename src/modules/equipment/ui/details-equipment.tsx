"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Slider from "react-slick";
// import { equipment } from "@/@types/dto/equipment";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Label } from "@/shared/components/ui/label";
import useSelectEquipment from "../lib/useSelectEquipment";
import { Equipment } from "@/@types/dto/equipment";

export default function EquipmentDetails({ equipment }: { equipment: Equipment }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const {observations} = useSelectEquipment(equipment.reference_pre);
  const fileImages: any = []

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleBack = () => {
    router.back();
  };

  // console.log( typeof equipment.start_date, equipment.start_date);

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
              <Label className="text-lg font-bold" htmlFor="equipment-info">General</Label>
              <div className="w-full lg:w-auto flex flex-wrap">
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Nombre del almacen:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{equipment.store_name}</Label>
                </div>
              </div>
              {/* <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Estado:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{equipment.status}</Label>
                </div>
              </div> */}
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Ubicacion:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{equipment.location}</Label>
                </div>
              </div>
              {/* <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Proyecto:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{equipment.name}</Label>
                </div>
              </div> */}
            </div>

            </div>
          </div>
          <div className="section">
            <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
              <Label className="text-lg font-bold" htmlFor="equipment-info">Datos contables</Label>
              <div className="w-full lg:w-auto flex flex-wrap">
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex flex-col lg:flex-row">
                  <div className="w-full lg:w-1/3 pr-2">
                    <Label htmlFor="reference" className="font-bold mb-1 lg:mb-0">Ref contable:</Label>
                  </div>
                  <div className="w-full lg:w-2/3">
                    <Label htmlFor="reference">{equipment.reference_con}</Label>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex flex-col lg:flex-row">
                  <div className="w-full lg:w-1/3 pr-2">
                    <Label htmlFor="reference" className="font-bold mb-1 lg:mb-0">Importe:</Label>
                  </div>
                  <div className="w-full lg:w-2/3">
                    <Label htmlFor="reference">{equipment.import}</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="section">
            <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
              <Label className="text-lg font-bold" htmlFor="equipment-info">Datos de mantenimiento</Label>
              <div className="w-full lg:w-auto flex flex-wrap">
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Ref contable:</Label>
                </div>
                <div className="w-1/2">
                <div className="flex">
                  
                    <Label htmlFor="reference">
                      {/* Utiliza el formato deseado para la presentación de las fechas */}
                      {new Date(equipment.review_date).toLocaleDateString()}
                    </Label>
                  </div>
                </div>
              </div>
              {/* <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Direccion:</Label>
                </div>
                <div className="w-1/2">
                 
                </div>
              </div> */}
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Fecha de alta:</Label>
                </div>
                <div className="w-1/2">
                <div className="flex items-center">
                    
                    <Label htmlFor="reference">
                      {/* Utiliza el formato deseado para la presentación de las fechas */}
                      {new Date(equipment.in_date).toLocaleDateString()}
                    </Label>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Estado:</Label>
                </div>
                <div className="w-1/2">
                <div className="flex items-center">
                   
                    <Label htmlFor="reference">
                      {/* Utiliza el formato deseado para la presentación de las fechas */}
                      {equipment.status}
                    </Label>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Fecha de baja:</Label>
                </div>
                <div className="w-1/2">
                <div className="flex items-center">
                    {/* <CalendarIcon className="w-6 h-6 mr-2" />  */}
                    <Label htmlFor="reference">
                      {/* Utiliza el formato deseado para la presentación de las fechas */}
                      {new Date(equipment.out_date).toLocaleDateString()}
                    </Label>
                  </div>
                </div>
              </div>
             
            </div>
            </div>
          </div>
          <div className="section">
            <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
              <Label className="text-lg font-bold" htmlFor="equipment-info">Motivo de baja</Label>
              <div className="w-full lg:w-auto flex flex-wrap border rounded-lg p-4" style={{ width: '300px', height: '100px' }}>
                  <div className="w-full lg:pr-2">
                    <div className="mb-3">
                      <Label>{equipment.out_motive}</Label>
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
          {/* <Associatedequipments equipmentId={equipment.id} /> */}
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
