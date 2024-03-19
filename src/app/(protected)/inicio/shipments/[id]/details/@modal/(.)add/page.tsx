"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
import AsociateMasterGuide from "@/modules/master-guides/ui/asociate-master-guide";
import { Input } from "@/shared/components/ui/input";
import createApi from "@/modules/master-guides/api";
// import createApi from "@/modules/master-guides/api";
// import CreatePackage from "@/modules/packages/ui/create-package";

export default async function AddDeliveryRequestDetailsPageModal({params: {id}}: {params: {id: number}}) {
  const router = useRouter();
  // const params = useSearchParams();
  // const pathname = usePathname();
  // const api = createApi()
  // const master_guide = await (await api).masterGuides.get(+id)

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
            <DialogTitle>ASOCIAR A GUIA MAESTRA</DialogTitle>
          </DialogHeader>
          <div className="p-6">
          <AsociateMasterGuide delivery_request_id={id}/>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
