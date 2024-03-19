import {PlaneTakeoffIcon, PlusIcon, UserPlusIcon, UsersIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
import {DeliveryRequestsTable} from "@/modules/delivery-requests/components/table";
import {TableLoading} from "@/shared/components/ui/table-loading";

export default function DeliveryRequestsPage({
  searchParams: {limit, page, q, ...sort},
}: {
  searchParams: {limit?: string; page?: string; q?: string; "sort[id]"?: "desc" | "asc"};
}) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between border-b pb-6">
        <h1 className="flex items-center gap-2">
          <PlaneTakeoffIcon className="size-[2.1rem]" />
          Solicitudes de envio
        </h1>
        <Link href="/operations/shipments/add">
          <Button className="flex items-center gap-2" variant="default">
            <PlusIcon className="size-4" /> Agregar solicitud
          </Button>
        </Link>
      </div>
      <Suspense fallback={<TableLoading />}>
        <DeliveryRequestsTable
          limit={limit ? +limit : undefined}
          q={q}
          skip={page ? (+page - 1) * +(limit || "10") : undefined}
          sort={sort}
        />
      </Suspense>
    </>
  );
}
