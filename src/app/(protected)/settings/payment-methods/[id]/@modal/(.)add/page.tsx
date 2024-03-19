"use client";

import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
import CreatePackage from "@/modules/packages/ui/create-package";

export default function AddPackagePageModal() {
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
            <DialogTitle>AGREGAR PAQUETE</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <CreatePackage />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
