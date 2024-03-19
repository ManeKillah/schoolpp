import {getAccessToken} from "@/shared/lib/auth";
import createApi from "@/modules/warehouses/api";

// import UpdatePackagePageClient from "./page.package";
import UpdateWarehousePageClient from "./page.warehouse";

export default async function UpdateWareHousePageModal({params: {id}}: {params: {id: string}}) {
  const accessToken = await getAccessToken();
  const api = createApi(accessToken);

  const warehouse = await (await api).warehouses.get(+id);

  return <UpdateWarehousePageClient warehouse={warehouse} />;
}
