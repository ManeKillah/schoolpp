import {PlusIcon, UsersIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
import {TableLoading} from "@/shared/components/ui/table-loading";
import createApi from "@/modules/users/api";
import {getAccessToken} from "@/shared/lib/auth";
import {AddressesTable} from "@/modules/users/components/addresses-table";

export default async function AddressesPage({
  params: {id},
  searchParams: {limit, q, page, ...sort},
}: {
  params: {id: string};
  searchParams: {limit?: string; page?: string; q?: string; "sort[id]"?: "desc" | "asc"};
}) {
  const api = createApi(await getAccessToken());

  const customer = await api.customer.get(+id);

  return (
    <>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/operations/customers">Clientes</Link>
        </Button>
        <span>/</span>
        <span>Direcciones</span>
      </div>
      <div className="my-4 flex items-center justify-between border-b pb-6">
        <h1 className="flex items-center gap-2">
          <UsersIcon className="size-[2.1rem]" />
          {customer.first_name} {customer.last_name}
        </h1>
        <Button asChild className="flex items-center gap-2" variant="default">
          <Link href={`/operations/customers/${customer.id}/addresses/add`}>
            <PlusIcon className="size-4" /> Agregar direcciones
          </Link>
        </Button>
      </div>
      <Suspense fallback={<TableLoading />}>
        <AddressesTable
          limit={limit ? +limit : undefined}
          q={q}
          skip={page ? (+page - 1) * +(limit || "10") : undefined}
          sort={sort}
          user_id={customer.id}
        />
      </Suspense>
    </>
  );
}
