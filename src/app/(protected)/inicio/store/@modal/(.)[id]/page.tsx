


import createApi from "@/modules/store/api";
import { getAccessToken } from "@/shared/lib/auth";
import UpdateStorePageDetails from "./page.client";
// import createApi from "@/modules/users/api";

export default async function StorePageDetailsModal({params: {id}}: {params: {id: number}}) {
  const accessToken = await getAccessToken();

  
  const api = createApi(accessToken);
  // console.log(accessToken);
// try{

  const store = await api.store.get(id);

  return <UpdateStorePageDetails store={store} />;
}
