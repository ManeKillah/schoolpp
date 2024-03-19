"use client";
import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";

import { Button } from "@/shared/components/ui/button";
// import { container } from "@/@types/dto/container";
import { Container } from "@/@types/dto/container";
import ContainerDetails from "@/modules/container/ui/details-container";
import { Store } from "@/@types/dto/store";
import StoreDetails from "@/modules/store/ui/details-store";

export default function UpdateStorePageDetails({store}: {store: Store}) {
  const router = useRouter();

  return (
    <div  style={{ maxHeight: "80vh", overflowY: "auto" }}>
  <Dialog
    open
    onOpenChange={(open) => {
      if (!open) router.back();
    }}
    // style={{ width: "80%", height: "80%" }} // Ajustar el ancho y alto del modal
  >
    <DialogContent>
      <DialogHeader style={{ justifyContent: "flex-start" }}> {/* Alinear el título a la izquierda */}
        <DialogTitle>DETALLES DEL ALMACEN #{store.reference}</DialogTitle>
      </DialogHeader>
      <div className="p-6">
        <StoreDetails store={store} />
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
