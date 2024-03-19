import {PlusIcon, UserIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
import {AdminsTables} from "@/modules/users/components/admins-table";
import {TableLoading} from "@/shared/components/ui/table-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import UpdateAdmin from "@/modules/users/ui/update-admin";
import createApi from "@/modules/users/api";
import { getAccessToken } from "@/shared/lib/auth";

export default async function AdminsPage({
  searchParams: {limit, page, q, ...sort},
}: {
  searchParams: {limit?: string; page?: string; q?: string; "sort[id]"?: "desc" | "asc"};
}) {
  const accessToken = await getAccessToken();

  const api = createApi(accessToken);
  const admin = await api.admin.get(+1);
  return (
    <div>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/settingd/admins">Configuraciones</Link>
        </Button>
        <span>/</span>
        <span>Editar configuraciones</span>
      </div>
      <div className="md:container">
        <Card>
          <CardHeader>
            <CardTitle>Editar Configuraciones</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateAdmin customer={admin} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
