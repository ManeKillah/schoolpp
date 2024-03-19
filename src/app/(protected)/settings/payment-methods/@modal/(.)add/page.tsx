"use client";

import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
// import CreatePackage from "@/modules/packages/ui/create-package";
// import CreateWareHouse from "@/modules/warehouses/ui/create-warehouse";
import CreatePaymentProvidersMethod from "@/modules/payment-providers-methods/ui/create-payment-providers-method";

export default function AddPaymentProviderMethodPageModal() {
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
            <DialogTitle>AGREGAR METODO DE PAGO</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <CreatePaymentProvidersMethod />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
