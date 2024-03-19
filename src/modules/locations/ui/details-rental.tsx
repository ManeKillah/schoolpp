"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Rental } from "@/@types/dto/rental";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { CalendarIcon } from "@radix-ui/react-icons";
import useSelectRental from "../lib/useSelectRental";

// import { RentalForm } from "../components/rental-form";
// import AssociatedRentals from "../components/associated-rentals";
// import Observations from "../components/observations";

export default function RentalDetails({ rental }: { rental: Rental }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const {observations} = useSelectRental(rental.reference);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleBack = () => {
    router.back();
  };

  console.log( typeof rental.start_date, rental.start_date);

  return (
    <div>
      {/* <div className="mb-4">
        <button onClick={handleBack}>Back</button>
      </div> */}
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <TabList>
          <Tab>informacion</Tab>
          <Tab>Alquileres Asignados</Tab>
          <Tab>Observaciones</Tab>
        </TabList>

        <TabPanel>
        <div>
          <div className="section">
            <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
              <Label className="text-lg font-bold" htmlFor="rental-info">General</Label>
              <div className="w-full lg:w-auto flex flex-wrap">
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2">
                  <div className="mb-3">
                    <Label htmlFor="reference">Proyecto: {rental.project_id}</Label>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2">
                  <div className="mb-3">
                    <Label htmlFor="reference">Empresa: {rental.company}</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
              <Label className="text-lg font-bold" htmlFor="rental-info">Duracion</Label>
              <div className="w-full lg:w-auto flex flex-wrap">
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2">
                  <div className="mb-3">
                  <div className="flex items-center">
                    <CalendarIcon className="w-6 h-6 mr-2" /> {/* Agrega el icono de calendario */}
                    <Label htmlFor="reference">
                      {/* Utiliza el formato deseado para la presentación de las fechas */}
                      {new Date(rental.start_date).toLocaleDateString()}
                    </Label>
                  </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2">
                  <div className="mb-3">
                  <div className="flex items-center">
                    <CalendarIcon className="w-6 h-6 mr-2" /> {/* Agrega el icono de calendario */}
                    <Label htmlFor="reference">
                      {/* Utiliza el formato deseado para la presentación de las fechas */}
                       {new Date(rental.end_date).toLocaleDateString()}
                    </Label>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
              <Label className="text-lg font-bold" htmlFor="rental-info">Descripcion</Label>
              <div className="w-full lg:w-auto flex flex-wrap border rounded-lg p-4" style={{ width: '300px', height: '100px' }}>
                  <div className="w-full lg:pr-2">
                    <div className="mb-3">
                      <Label>{rental.observations}</Label>
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
          {/* <AssociatedRentals rentalId={rental.id} /> */}
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
