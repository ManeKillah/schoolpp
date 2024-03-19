import {getAccessToken} from "@/shared/lib/auth";
import createApi from "@/modules/users/api";

import UpdateCustomerPageClient from "./page.client";

export default async function UpdateCustomerPageModal({params: {id}}: {params: {id: string}}) {
  const accessToken = await getAccessToken();
  const api = createApi(accessToken);

  const customer = await api.customer.get(+id);

  return <UpdateCustomerPageClient customer={customer} />;
}
