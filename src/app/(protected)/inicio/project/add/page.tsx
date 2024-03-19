import Link from "next/link";

import CreateCustomer from "@/modules/users/ui/create-customer";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";
import CreateRental from "@/modules/rental/ui/create-rental";
import CreateProject from "@/modules/project/ui/create-project";

export default function AddProjectPage() {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/inicio/project">Proyectos</Link>
        </Button>
        <span>/</span>
        <span>Agregar Proyecto</span>
      </div>
      <div className="md:container">
        <Card>
          <CardHeader>
            {/* <CardTitle>Crear solicitud de envió</CardTitle> */}
          </CardHeader>
          <CardContent>
            <CreateProject />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
