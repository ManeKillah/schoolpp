import Link from "next/link";

import UpdateCustomer from "@/modules/users/ui/update-customer";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {getAccessToken} from "@/shared/lib/auth";
import createApi from "@/modules/project/api";
import UpdateRental from "@/modules/rental/ui/update-rental";
import UpdateProject from "@/modules/project/ui/update-project";
// import createApi from "@/modules/users/api";

export default async function ProjectPageEdit({params: {id}}: {params: {id: number}}) {
  const accessToken = await getAccessToken();

  const api = createApi(accessToken);

  const project = await api.project.get(id);
  // console.log(22, id);

  return (
    <div>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/inicio/project">Proyectos</Link>
        </Button>
        <span>/</span>
        <span>Editar proyecto</span>
      </div>
      <div className="md:container">
        <Card>
          <CardHeader>
            <CardTitle>Editar Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateProject project={project} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
