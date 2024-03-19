"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Slider from "react-slick";
// import { project } from "@/@types/dto/project";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { CalendarIcon } from "@radix-ui/react-icons";
import useSelectProject from "../lib/useSelectProject";
import { Project } from "@/@types/dto/project";
// import useSelectproject from "../lib/useSelectproject";

// import { projectForm } from "../components/project-form";
// import Associatedprojects from "../components/associated-projects";
// import Observations from "../components/observations";

export default function ProjectDetails({ project }: { project: Project }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const {observations} = useSelectProject(project.reference);
  const fileImages: any = []

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleBack = () => {
    router.back();
  };

  // console.log( typeof project.start_date, project.start_date);

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
              <Label className="text-lg font-bold" htmlFor="project-info">General</Label>
              <div className="w-full lg:w-auto flex flex-wrap">
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Operativo:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{project.operativo}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Estado:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{project.status}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Empresa:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{project.company}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Proyecto:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{project.name}</Label>
                </div>
              </div>
            </div>

            </div>
          </div>
          <div className="section">
            <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
              <Label className="text-lg font-bold" htmlFor="project-info">Datos de facturacion</Label>
              <div className="w-full lg:w-auto flex flex-wrap">
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">CIF:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{project.CIF}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Direccion:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{project.village_id}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Ciudad:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{project.city_id}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Codigo Postal:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{project.dane_code}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Pais:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{project.country_id}</Label>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mb-3 lg:pr-2 flex">
                <div className="w-1/2 pr-2">
                  <Label htmlFor="reference" className="font-bold">Provincia:</Label>
                </div>
                <div className="w-1/2">
                  <Label htmlFor="reference">{project.village_id}</Label>
                </div>
              </div>
            </div>

            </div>
          </div>
          <div className="section">
            <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
              <Label className="text-lg font-bold" htmlFor="project-info">Duracion</Label>
              <div className="w-full lg:w-auto flex flex-wrap">
                <div className="w-full lg:w-1/2 mb-3 lg:pr-2">
                  <div className="mb-3">
                  <div className="flex items-center">
                    <CalendarIcon className="w-6 h-6 mr-2" /> {/* Agrega el icono de calendario */}
                    <Label htmlFor="reference">
                      {/* Utiliza el formato deseado para la presentación de las fechas */}
                      {new Date(project.start_date).toLocaleDateString()}
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
                       {new Date(project.end_date).toLocaleDateString()}
                    </Label>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
              <Label className="text-lg font-bold" htmlFor="project-info">Descripcion</Label>
              <div className="w-full lg:w-auto flex flex-wrap border rounded-lg p-4" style={{ width: '300px', height: '100px' }}>
                  <div className="w-full lg:pr-2">
                    <div className="mb-3">
                      <Label>{project.observations}</Label>
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
          {/* <Associatedprojects projectId={project.id} /> */}
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
            observations && 
            <>
            {observations.map((observation)=>{
              <div className="section">
              <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-6">
                <Label className="text-lg font-bold" htmlFor="project-info">Observacion #{observation.id}</Label>
                <div className="w-full lg:w-auto flex flex-wrap border rounded-lg p-4" style={{ width: '300px', height: '100px' }}>
                    <div className="w-full lg:pr-2">
                      <div className="mb-3">
                        <Label>{observation.message}</Label>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            })}
            </>
          }
          {/* <Associatedprojects projectId={project.id} /> */}
          <div></div>
        </TabPanel>
      
      </Tabs>
    </div>
  );
}
