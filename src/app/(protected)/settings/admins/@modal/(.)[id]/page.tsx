import {getAccessToken} from "@/shared/lib/auth";
import createApi from "@/modules/users/api";

import UpdateCustomerPageAdmin from "./page.admin";

export default async function UpdateCustomerPageModal({params: {id}}: {params: {id: string}}) {
  const accessToken = await getAccessToken();
  const api = createApi(accessToken);

  const customer = await api.admin.get(+id);

  return <UpdateCustomerPageAdmin customer={customer} />;
}
