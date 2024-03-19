"use client";
import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
import UpdateCustomer from "@/modules/users/ui/update-customer";
import { Rental } from "@/@types/dto/rental";
import ProjectDetails from "@/modules/project/ui/details-project";
import { Button } from "@/shared/components/ui/button";
import { Project } from "@/@types/dto/project";

export default function UpdateProjectPageDetails({project}: {project: Project}) {
  const router = useRouter();

  return (
    <div>
  <Dialog
    open
    onOpenChange={(open) => {
      if (!open) router.back();
    }}
    // style={{ width: "80%", height: "80%" }} // Ajustar el ancho y alto del modal
  >
    <DialogContent>
      <DialogHeader style={{ justifyContent: "flex-start" }}> {/* Alinear el título a la izquierda */}
        <DialogTitle>DETALLES DEL PROYECTO #{project.reference}</DialogTitle>
      </DialogHeader>
      <div className="p-6">
        <ProjectDetails project={project} />
      </div>
      <div className="p-6">
      <DialogFooter style={{ justifyContent: "flex-end py-2 px-4 mr-2" }}> {/* Alinear el botón cancelar a la derecha */}
        <Button  className="w-full rounded-md bg-white text-black py-2 px-4 mr-2 border border-gray-300">Regresar</Button> {/* Establecer el ancho del botón cancelar */}
      </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
</div>

  );
}
