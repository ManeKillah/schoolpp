"use client";

import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
// import CreatePackage from "@/modules/packages/ui/create-package";
import CreateWareHouse from "@/modules/warehouses/ui/create-warehouse";

export default function AddWarehousePageModal() {
  const router = useRouter();

  return (
    <div>
      <Dialog
        open
        onOpenChange={(open) => {
          if (!open) router.back();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AGREGAR BODEGA</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <CreateWareHouse />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
