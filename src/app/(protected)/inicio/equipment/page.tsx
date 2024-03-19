import {PackageIcon, PackagePlusIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
// import {PackagesTable} from "@/modules/packages/components/packages-table";
import {TableLoading} from "@/shared/components/ui/table-loading";
import { RentalTable } from "@/modules/rental/components/rental-table";
import { EquipmentTable } from "@/modules/equipment/components/rental-table";

export default function EquipmentPage({
  searchParams: {limit, page, q, status, location, ...sort},
}: {
  searchParams: {limit?: string; page?: string; q?: string; location?: string; status?: string; "sort[id]"?: "desc" | "asc"};
}) {
  return (
    <>
      <div className="my-4 flex items-center justify-between border-b pb-6">
        <h1 className="flex items-center gap-2">
          <PackageIcon className="size-[2.1rem]" />
          Equipos
        </h1>
        <Button asChild className="flex items-center gap-2" variant="default">
          <Link href="/inicio/equipment/add/details">
            <PackagePlusIcon className="size-4" /> Agregar Equipo
          </Link>
        </Button>
      </div>
      <Suspense fallback={<TableLoading />}>
        <EquipmentTable
          limit={limit ? +limit : undefined}
          q={q}
          status={status}
          location={location}
          skip={page ? (+page - 1) * +(limit || "10") : undefined}
          sort={sort}
        />
      </Suspense>
    </>
  );
}
