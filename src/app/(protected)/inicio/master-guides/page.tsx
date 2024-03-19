import {FileKeyIcon, PlusIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
import {MasterGuidesTable} from "@/modules/master-guides/components/table";
import {TableLoading} from "@/shared/components/ui/table-loading";

export default function MasterGuidesPage({
  searchParams: {limit, page, q, ...sort},
}: {
  searchParams: {limit?: string; page?: string; q?: string; "sort[id]"?: "desc" | "asc"};
}) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between border-b pb-6">
        <h1 className="flex items-center gap-2">
          <FileKeyIcon className="size-[2.1rem]" />
          Consolidados
        </h1>
        <Link href="/operations/master-guides/add">
          <Button className="flex items-center gap-2" variant="default">
            <PlusIcon className="size-4" /> Agregar Consolidado
          </Button>
        </Link>
      </div>
      <Suspense fallback={<TableLoading />}>
        <MasterGuidesTable
          limit={limit ? +limit : undefined}
          q={q}
          skip={page ? (+page - 1) * +(limit || "10") : undefined}
          sort={sort}
        />
      </Suspense>
    </>
  );
}
