"use client";
// import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
import Warehouse from "@/@types/dto/warehouse";
import UpdateWarehose from "@/modules/warehouses/ui/update-warehouse";

export default function UpdateWarehousePageClient({warehouse}: {warehouse: Warehouse}) {
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
            <DialogTitle>ACTUALIZAR BODEGA</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <UpdateWarehose warehouse={warehouse} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
