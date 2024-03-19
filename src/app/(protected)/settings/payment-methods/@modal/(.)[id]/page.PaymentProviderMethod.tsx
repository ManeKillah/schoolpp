"use client";
// import type {User} from "@/@types/dto/user";

import {useRouter} from "next/navigation";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
// import Warehouse from "@/@types/dto/warehouse";
// import UpdateWarehose from "@/modules/warehouses/ui/update-warehouse";
import PaymentProviderMethod from "@/@types/dto/paymentProviderMethod";
import UpdatePaymentProviderMethod from "@/modules/payment-providers-methods/ui/update-payment-providers-method";

export default function UpdatePaymentProviderMethodPageClient({paymentMethod}: {paymentMethod: PaymentProviderMethod}) {
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
            <DialogTitle>ACTUALIZAR METODO DE PAGO</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <UpdatePaymentProviderMethod paymentMethod={paymentMethod} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
