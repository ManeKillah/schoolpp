


import createApi from "@/modules/users/api";
import { getAccessToken } from "@/shared/lib/auth";
import UpdateContainerPageDetails from "./page.client";
import UpdateCustomerPageDetails from "./page.client";
// import createApi from "@/modules/users/api";

export default async function CustomerPageDetailsModal({params: {id}}: {params: {id: number}}) {
  const accessToken = await getAccessToken();

  
  const api = createApi(accessToken);
  // console.log(accessToken);
// try{

  const customer = await api.customer.get(id);

  return <UpdateCustomerPageDetails customer={customer} />;
}
