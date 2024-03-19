"use client";
import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";

import { Button } from "@/shared/components/ui/button";
// import { container } from "@/@types/dto/container";
import { Container } from "@/@types/dto/container";
import ContainerDetails from "@/modules/container/ui/details-container";

export default function UpdateContainerPageDetails({container}: {container: Container}) {
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
        <DialogTitle>DETALLES DEL PROYECTO #{container.reference_pre}</DialogTitle>
      </DialogHeader>
      <div className="p-6">
        <ContainerDetails container={container} />
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
