"use client";
import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
import UpdateCustomer from "@/modules/users/ui/update-customer";

export default function UpdateCustomerPageClient({customer}: {customer: User}) {
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
            <DialogTitle>ACTUALIZAR CLIENTE</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <UpdateCustomer customer={customer} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
