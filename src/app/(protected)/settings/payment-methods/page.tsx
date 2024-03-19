import {CreditCardIcon, PlusIcon, UserPlusIcon, UsersIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
import {PaymentProvidersMethodsTable} from "@/modules/payment-providers-methods/components/table";
import {TableLoading} from "@/shared/components/ui/table-loading";

export default function PaymentProvidersMethodsPage({
  searchParams: {limit, page, q, ...sort},
}: {
  searchParams: {limit?: string; page?: string; q?: string; "sort[id]"?: "desc" | "asc"};
}) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between border-b pb-6">
        <h1 className="flex items-center gap-2">
          <CreditCardIcon className="size-[2.1rem]" />
          Metodos de pago
        </h1>
        <Link href="/settings/payment-methods/add">
          <Button className="flex items-center gap-2" variant="default">
            <PlusIcon className="size-4" /> Agregar metodo de pago
          </Button>
        </Link>
      </div>
      <Suspense fallback={<TableLoading />}>
        <PaymentProvidersMethodsTable
          limit={limit ? +limit : undefined}
          q={q}
          skip={page ? (+page - 1) * +(limit || "10") : undefined}
          sort={sort}
        />
      </Suspense>
    </>
  );
}
