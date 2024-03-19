import Link from "next/link";

import UpdateCustomer from "@/modules/users/ui/update-customer";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {getAccessToken} from "@/shared/lib/auth";
import createApi from "@/modules/container/api";
import UpdateRental from "@/modules/rental/ui/update-rental";
import UpdateContainer from "@/modules/container/ui/update-container";
// import createApi from "@/modules/users/api";

export default async function ContainerPageEdit({params: {id}}: {params: {id: number}}) {
  const accessToken = await getAccessToken();

  const api = createApi(accessToken);

  const container = await api.container.get(id);
  // console.log(22, id);

  return (
    <div>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/inicio/container">Contenedores</Link>
        </Button>
        <span>/</span>
        <span>Editar contenedor</span>
      </div>
      <div className="md:container">
        <Card>
          <CardHeader>
            <CardTitle>Editar Contenedor</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateContainer container={container} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
