
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
// import CreateRental from "@/modules/rental/ui/create-rental";
// import { useRouter } from "next/navigation";
import RentalDetails from "@/modules/rental/ui/details-rental";
// import createApi from "@/modules/rental/api";
import { getAccessToken } from "@/shared/lib/auth";
import UpdateRentalPageDetails from "./page.client";
import createApi from "@/modules/project/api";
import UpdateProjectPageDetails from "./page.client";
// import createApi from "@/modules/users/api";

export default async function ProjectPageDetailsModal({params: {id}}: {params: {id: number}}) {
  const accessToken = await getAccessToken();

  
  const api = createApi(accessToken);
  // console.log(accessToken);
// try{

  const project = await api.project.get(id);

  return <UpdateProjectPageDetails project={project} />;
}
