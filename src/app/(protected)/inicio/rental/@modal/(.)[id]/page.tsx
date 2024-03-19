
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
// import CreateRental from "@/modules/rental/ui/create-rental";
// import { useRouter } from "next/navigation";
import RentalDetails from "@/modules/rental/ui/details-rental";
import createApi from "@/modules/rental/api";
import { getAccessToken } from "@/shared/lib/auth";
import UpdateRentalPageDetails from "./page.client";
import { Rental } from "@/@types/dto/rental";
// import createApi from "@/modules/users/api";

export default async function RentalPageDetailsModal({params: {id}}: {params: {id?: string}}) {
  const accessToken = await getAccessToken();

  
  const api = createApi(accessToken);
  // console.log(accessToken);
// try{

      let rental: Rental;
      console.log(id);
      if(id != 'add'){
        rental = await api.rental.get(Number(id));
      }

  return <UpdateRentalPageDetails rental={rental} />;
}
