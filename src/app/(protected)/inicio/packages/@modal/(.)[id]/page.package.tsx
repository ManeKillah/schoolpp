"use client";
// import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
// import UpdateCu from "@/modules/users/ui/update-customer";
import { Package } from "@/@types/dto/package";
import UpdatePackage from "@/modules/packages/ui/update-package";

export default function UpdatePackagePageClient({packageId}: {packageId: Package}) {
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
            <DialogTitle>ACTUALIZAR PAQUETE</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <UpdatePackage packages={packageId} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
