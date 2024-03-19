"use client";
import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
// import UpdateCustomer from "@/modules/users/ui/update-customer";
import UpdateAdmin from "@/modules/users/ui/update-admin";

export default function UpdateCustomerPageAdmin({customer}: {customer: User}) {
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
            <DialogTitle>ACTUALIZAR ADMINISTRADOR</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <UpdateAdmin customer={customer} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
