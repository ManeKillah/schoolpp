import {FileKeyIcon, PlusIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
import {MasterGuidesTable} from "@/modules/master-guides/components/table";
import {TableLoading} from "@/shared/components/ui/table-loading";
import { DeliveryRequestsPackagesTable } from "@/modules/delivery-requests-packages/packages/components/delivery-requests-packages-table";

export default function MasterGuidesDetailsPage({
  params: {reference},
  searchParams: {limit, page, q,...sort},
}: {
  params: {reference: string};
  searchParams: {limit?: string; page?: string; q?: string; id: number; "sort[id]"?: "desc" | "asc"};
}) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between border-b pb-6">
        <h1 className="flex items-center gap-2">
          <FileKeyIcon className="size-[2.1rem]" />
          Consolidado # {reference}
        </h1>
        {/* <Link href="/operations/master-guides/add">
          <Button className="flex items-center gap-2" variant="default">
            <PlusIcon className="size-4" /> Agregar Guía Maestra
          </Button>
        </Link> */}
      </div>
      <Suspense fallback={<TableLoading />}>
        <DeliveryRequestsPackagesTable
          reference={reference}
          limit={limit ? +limit : undefined}
          q={q}
          skip={page ? (+page - 1) * +(limit || "10") : undefined}
          sort={sort}
        />
      </Suspense>
    </>
  );
}
