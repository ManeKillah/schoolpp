


import createApi from "@/modules/equipment/api";
import { getAccessToken } from "@/shared/lib/auth";
import UpdateEquipmentPageDetails from "./page.client";
// import createApi from "@/modules/users/api";

export default async function EquipmentPageDetailsModal({params: {id}}: {params: {id: number}}) {
  const accessToken = await getAccessToken();

  
  const api = createApi(accessToken);
  // console.log(accessToken);
// try{

  const equipment = await api.equipment.get(id);

  return <UpdateEquipmentPageDetails equipment={equipment} />;
}
