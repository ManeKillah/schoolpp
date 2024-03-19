"use client";
import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
import CreateAdmin from "@/modules/users/ui/create-admin";

export default function AddAdminPageModal() {
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
            <DialogTitle>AGREGAR ADMINISTRADOR</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <CreateAdmin />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
