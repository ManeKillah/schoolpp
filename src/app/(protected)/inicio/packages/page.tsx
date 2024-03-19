import {PackageIcon, PackagePlusIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
import {PackagesTable} from "@/modules/packages/components/packages-table";
import {TableLoading} from "@/shared/components/ui/table-loading";

export default function PackagesPage({
  searchParams: {limit, page, q, ...sort},
}: {
  searchParams: {limit?: string; page?: string; q?: string; "sort[id]"?: "desc" | "asc"};
}) {
  return (
    <>
      <div className="my-4 flex items-center justify-between border-b pb-6">
        <h1 className="flex items-center gap-2">
          <PackageIcon className="size-[2.1rem]" />
          Paquetes
        </h1>
        <Button asChild className="flex items-center gap-2" variant="default">
          <Link href="/operations/packages/add">
            <PackagePlusIcon className="size-4" /> Agregar paquete
          </Link>
        </Button>
      </div>
      <Suspense fallback={<TableLoading />}>
        <PackagesTable
          limit={limit ? +limit : undefined}
          q={q}
          skip={page ? (+page - 1) * +(limit || "10") : undefined}
          sort={sort}
        />
      </Suspense>
    </>
  );
}
