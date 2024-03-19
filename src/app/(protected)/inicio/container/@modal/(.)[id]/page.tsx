


import createApi from "@/modules/container/api";
import { getAccessToken } from "@/shared/lib/auth";
import UpdateContainerPageDetails from "./page.client";
// import createApi from "@/modules/users/api";

export default async function ContainerPageDetailsModal({params: {id}}: {params: {id: number}}) {
  const accessToken = await getAccessToken();

  
  const api = createApi(accessToken);
  // console.log(accessToken);
// try{

  const container = await api.container.get(id);

  return <UpdateContainerPageDetails container={container} />;
}
