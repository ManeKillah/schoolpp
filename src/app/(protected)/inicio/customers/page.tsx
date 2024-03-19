import {UserPlusIcon, UsersIcon} from "lucide-react";
import Link from "next/link";
import {Suspense, useState} from "react";

import {Button} from "@/shared/components/ui/button";
import {CustomersTable} from "@/modules/users/components/customers-table";
import {TableLoading} from "@/shared/components/ui/table-loading";

export default function CustomersPage({
  searchParams: {limit, page, q, status,  ...sort},
}: {
  searchParams: {limit?: string; page?: string; q?: string; status?: string; "sort[id]"?: "desc" | "asc"};
}) {
  
  return (
    <>
      <div className="my-4 flex items-center justify-between border-b pb-6">
        <h1 className="flex items-center gap-2">
          <UsersIcon className="size-[2.1rem]" />
          Clientes
        </h1>
        <Button asChild className="flex items-center gap-2" variant="default">
          <Link href="/inicio/customers/add/details">
            <UserPlusIcon className="size-4" /> Agregar cliente
          </Link>
        </Button>
      </div>
      <Suspense fallback={<TableLoading />}>
        <CustomersTable
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
