import Link from "next/link";

import UpdateCustomer from "@/modules/users/ui/update-customer";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {getAccessToken} from "@/shared/lib/auth";
import createApi from "@/modules/equipment/api";
import UpdateRental from "@/modules/rental/ui/update-rental";
import UpdateEquipment from "@/modules/equipment/ui/update-equipment";
// import createApi from "@/modules/users/api";

export default async function EquipmentPageEdit({params: {id}}: {params: {id: number}}) {
  const accessToken = await getAccessToken();

  const api = createApi(accessToken);

  const rental = await api.equipment.get(id);
  console.log(22, id);

  return (
    <div>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/inicio/equipment">Equipos</Link>
        </Button>
        <span>/</span>
        <span>Editar equipo</span>
      </div>
      <div className="md:container">
        <Card>
          <CardHeader>
            <CardTitle>Editar Equipo</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateEquipment equipment={rental} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
