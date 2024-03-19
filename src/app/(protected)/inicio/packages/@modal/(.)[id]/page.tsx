import {getAccessToken} from "@/shared/lib/auth";
import createApi from "@/modules/packages/api";

import UpdatePackagePageClient from "./page.package";

export default async function UpdatePackagePageModal({params: {id}}: {params: {id: string}}) {
  const accessToken = await getAccessToken();
  const api = createApi(accessToken);

  const packageId = await api.package.get(+id);

  return <UpdatePackagePageClient packageId={packageId} />;
}
