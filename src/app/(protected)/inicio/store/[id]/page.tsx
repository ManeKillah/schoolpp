import Link from "next/link";

import UpdateCustomer from "@/modules/users/ui/update-customer";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {getAccessToken} from "@/shared/lib/auth";
import createApi from "@/modules/store/api";
import UpdateRental from "@/modules/rental/ui/update-rental";
import UpdateStore from "@/modules/store/ui/update-store";
// import createApi from "@/modules/users/api";

export default async function StorePageEdit({params: {id}}: {params: {id: number}}) {
  const accessToken = await getAccessToken();

  const api = createApi(accessToken);

  const store = await api.store.get(id);
  // console.log(22, id);

  return (
    <div>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/inicio/stores">Almacenes</Link>
        </Button>
        <span>/</span>
        <span>Editar almacen</span>
      </div>
      <div className="md:container">
        <Card>
          <CardHeader>
            <CardTitle>Editar Alamcen</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateStore store={store} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
