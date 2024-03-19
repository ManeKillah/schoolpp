"use client";
import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
// import CreateCustomer from "@/modules/users/ui/create-customer";
import CreateMasterGuide from "@/modules/master-guides/ui/create-master-guide";

export default function AddMasterGuidePageModal() {
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
            <DialogTitle>AGREGAR CONSOLIDADO</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <CreateMasterGuide />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
