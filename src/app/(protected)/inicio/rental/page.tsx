import {PackageIcon, PackagePlusIcon, ZapIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
// import {PackagesTable} from "@/modules/packages/components/packages-table";
import {TableLoading} from "@/shared/components/ui/table-loading";
import { RentalTable } from "@/modules/rental/components/rental-table";

export default function PackagesPage({
  searchParams: {limit, page, q, status, ...sort},
}: {
  searchParams: {limit?: string; page?: string; q?: string; status?: string; "sort[id]"?: "desc" | "asc"};
}) {
  return (
    <>
      <div className="my-4 flex items-center justify-between border-b pb-6">
        <h1 className="flex items-center gap-2">
          <ZapIcon className="size-[2.1rem]" />
          Alquileres
        </h1>
        <Button asChild className="flex items-center gap-2" variant="default">
          <Link href="/inicio/rental/add/rental">
            <PackagePlusIcon className="size-4" /> Agregar Alquiler
          </Link>
        </Button>
      </div>
      <Suspense fallback={<TableLoading />}>
        <RentalTable
          limit={limit ? +limit : undefined}
          q={q}
          status={status}
          skip={page ? (+page - 1) * +(limit || "10") : undefined}
          sort={sort}
        />
      </Suspense>
    </>
  );
}
