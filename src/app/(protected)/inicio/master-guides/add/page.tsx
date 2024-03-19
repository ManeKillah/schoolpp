import Link from "next/link";

import CreateCustomer from "@/modules/users/ui/create-customer";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";

export default function AddCustomerPage() {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/operations/customers">Clientes</Link>
        </Button>
        <span>/</span>
        <span>Agregar cliente</span>
      </div>
      <div className="md:container">
        <Card>
          <CardHeader>
            <CardTitle>Crear solicitud de envió</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateCustomer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
