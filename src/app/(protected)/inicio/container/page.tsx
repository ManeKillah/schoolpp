import {PackageIcon, PackagePlusIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
// import {PackagesTable} from "@/modules/packages/components/packages-table";
import {TableLoading} from "@/shared/components/ui/table-loading";
import { RentalTable } from "@/modules/rental/components/rental-table";
import { ContainerTable } from "@/modules/container/components/container-table";

export default function ContainerPage({
  searchParams: {limit, page, q, status, location,  ...sort},
}: {
  searchParams: {limit?: string; page?: string; q?: string; location?: string; status?: string;  "sort[id]"?: "desc" | "asc"};
}) {
  return (
    <>
      <div className="my-4 flex items-center justify-between border-b pb-6">
        <h1 className="flex items-center gap-2">
          <PackageIcon className="size-[2.1rem]" />
          Contenedores
        </h1>
        <Button asChild className="flex items-center gap-2" variant="default">
          <Link href="/inicio/container/add/details">
            <PackagePlusIcon className="size-4" /> Agregar Contenedor
          </Link>
        </Button>
      </div>
      <Suspense fallback={<TableLoading />}>
        <ContainerTable
          limit={limit ? +limit : undefined}
          q={q}
          location={location}
          status={status}
          skip={page ? (+page - 1) * +(limit || "10") : undefined}
          sort={sort}
        />
      </Suspense>
    </>
  );
}
