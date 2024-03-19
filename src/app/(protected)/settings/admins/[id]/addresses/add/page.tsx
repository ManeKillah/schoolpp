import Link from "next/link";

import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";

export default function AddAddressPage({params: {id}}: {params: {id: string}}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/operations/customers">Clientes</Link>
        </Button>
        <span>/</span>
        <Button asChild className="p-0" variant="link">
          <Link href={`/operations/customers/${id}/addresses`}>Direcciones</Link>
        </Button>
        <span>/</span>
        <span>Agregar dirección</span>
      </div>
      <div className="md:container">
        <Card>
          <CardHeader>
            <CardTitle>Crear dirección</CardTitle>
          </CardHeader>
          <CardContent>{/* <CreateAddress /> */}</CardContent>
        </Card>
      </div>
    </div>
  );
}
