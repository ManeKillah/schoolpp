import Link from "next/link";

import CreateCustomer from "@/modules/users/ui/create-customer";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";
import CreateRental from "@/modules/rental/ui/create-rental";
import CreateEquipment from "@/modules/equipment/ui/create-equipment";

export default function AddEquipmentPage() {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/inicio/equipment">Equipos</Link>
        </Button>
        <span>/</span>
        <span>Agregar Equipo</span>
      </div>
      <div className="md:container">
        <Card>
          <CardHeader>
            {/* <CardTitle>Crear solicitud de envió</CardTitle> */}
          </CardHeader>
          <CardContent>
            <CreateEquipment />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
