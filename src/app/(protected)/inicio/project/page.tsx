import {PackageIcon, PackagePlusIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
// import {PackagesTable} from "@/modules/packages/components/packages-table";
import {TableLoading} from "@/shared/components/ui/table-loading";
import { ProjectTable } from "@/modules/project/components/rental-table";


export default function ProjectsPage({
  searchParams: {limit, page, q, status, start_date, end_date, ...sort},
}: {
  searchParams: {limit?: string; page?: string; q?: string; status?: string; start_date?: string; end_date?: string; "sort[id]"?: "desc" | "asc"};
}) {
  return (
    <>
      <div className="my-4 flex items-center justify-between border-b pb-6">
        <h1 className="flex items-center gap-2">
          <PackageIcon className="size-[2.1rem]" />
          Proyectos
        </h1>
        <Button asChild className="flex items-center gap-2" variant="default">
          <Link href="/inicio/project/add/project">
            <PackagePlusIcon className="size-4" /> Agregar proyecto
          </Link>
        </Button>
      </div>
      <Suspense fallback={<TableLoading />}>
        <ProjectTable
          limit={limit ? +limit : undefined}
          q={q}
          status={status}
          start_date={start_date}
          end_date={end_date}
          skip={page ? (+page - 1) * +(limit || "10") : undefined}
          sort={sort}
        />
      </Suspense>
    </>
  );
}
