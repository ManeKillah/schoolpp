import Link from "next/link";

import UpdateCustomer from "@/modules/users/ui/update-customer";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {getAccessToken} from "@/shared/lib/auth";
import createApi from "@/modules/users/api";

export default async function CustomersPageEdit({params: {id}}: {params: {id: number}}) {
  const accessToken = await getAccessToken();

  const api = createApi(accessToken);

  const customer = await api.customer.get(id);

  return (
    <div>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/operations/customers">Clientes</Link>
        </Button>
        <span>/</span>
        <span>Editar cliente</span>
      </div>
      <div className="md:container">
        <Card>
          <CardHeader>
            <CardTitle>Editar cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateCustomer customer={customer} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
