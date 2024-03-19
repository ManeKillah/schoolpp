import {HomeIcon, MailIcon, PhoneIcon, PlusIcon, UserIcon, UsersIcon} from "lucide-react";
import Link from "next/link";
import {Suspense} from "react";

import {Button} from "@/shared/components/ui/button";
import {TableLoading} from "@/shared/components/ui/table-loading";
import createApi from "@/modules/delivery-requests/api";
import createApiUser from "@/modules/users/api";
import createApiPackage from "@/modules/packages/api";
// import createApiDeliveryPackage from "@/modules/delivery-request-package/api";
import {getAccessToken} from "@/shared/lib/auth";
import {AddressesTable} from "@/modules/users/components/addresses-table";

export default async function DetailsPage({
  params: {id},
  searchParams: {limit, q, page, ...sort},
}: {
  params: {id: string};
  searchParams: {limit?: string; page?: string; q?: string; "sort[id]"?: "desc" | "asc"};
}) {
  const api = createApi(await getAccessToken());
  const apiU = createApiUser(await getAccessToken());
  const apiP = createApiPackage(await getAccessToken());

  const deliveryRequest = await api.deliveryRequests.get(+id);
  const deliveryRequestpackage = await api.deliveryRequestPackage.list({
    delivery_request_id: deliveryRequest.id
  });
  // console.log(deliveryRequestpackage);
  const customer = await apiU.customer.get(+deliveryRequest.user_id);
  const address = await apiU.customer.addresses.list({user_id: customer.id});
  const packages = await apiP.package.get(+deliveryRequestpackage.data[0].id);

  return (
    <>
      <div className="mb-2 flex items-center gap-1 text-xs text-muted">
        <Button asChild className="p-0" variant="link">
          <Link href="/operations/customers">Solicitud de envios</Link>
        </Button>
        <span>/</span>
        <span>Detalles</span>
      </div>
      <div className="my-4 flex items-center justify-between  pb-6">
        <h1 className="flex items-center gap-2">
          {/* <UsersIcon className="size-[2.1rem]" /> */}
          ID {deliveryRequest.id}
        </h1>
    
      </div>
      <Suspense fallback={<TableLoading />}>
        <div className="flex gap-6" >
          
        <div className="w-5/12 my-4 pb-6 shadow-lg p-6 rounded">
          <h1 className="flex items-center gap-2">
            {/* <UsersIcon className="size-[2.1rem]" /> */}
            Informacion del cliente
          </h1>
          <div>
            <div className="flex p-3">
              <UserIcon/>
              <p>Nombre: {customer.first_name}</p>
            </div>
            <div className="flex p-3">
              <HomeIcon/>
              <p>Dirección: {address.data[0].address_line1}</p>
            </div>
            <div className="flex">

            <div className="flex p-3">
              <PhoneIcon/>
              <p>Teléfono: {customer.phone}</p>
            </div>
            <div className="flex p-3">
              <MailIcon/>
              <p>Correo: {customer.email}</p>
            </div>
            </div>
            </div>
        </div>
        <div className="flex-1 my-4 pb-6 shadow-lg rounded p-6">
          <h1 className="flex items-center gap-2">
            {/* <UsersIcon className="size-[2.1rem]" /> */}
            Pagos
          </h1>
          <div className="flex-col p-3 ">
              <p>Subtotal: {deliveryRequest.service_amount_subtotal}</p>
              {/* <p>Dirección: {customer.}</p> */}
              <p>Valor asegurado: {deliveryRequest.service_amount_inssurance}</p>
              <p>Impuestos: {deliveryRequest.service_amount_tax}</p>
              <p>Total: {deliveryRequest.service_amount_total}</p>
            </div>
        </div>
        </div>
        <div className="flex justify-end">
        <Button asChild className="flex items-center gap-2 text-xs py-1 px-2" variant="default">
          <Link href={`/operations/shipments/${id}/details/add`}>
             Asociar a guia maestra
          </Link>
        </Button>
        </div>
          {/* Aquí colocas la información de los pagos */}
          <div className="flex-1 my-4 pb-6 shadow-lg rounded p-6">
      <h1 className="flex items-center gap-2">Paquetes</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-right">Peso</th>
            <th className="px-4 py-2 text-right">Valor asegurado</th>
            <th className="px-4 py-2 text-right">Valor de envío</th>
            <th className="px-4 py-2 text-right">Asociar a guía maestra</th>
            <th className="px-4 py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {/* {deliveryRequestPackages.map((packageItem, index) => ( */}
            <tr>
              <td className="px-4 py-2 text-right">{packages.weight_lb}</td>
              <td className="px-4 py-2 text-right">{deliveryRequestpackage.data[0].amount_inssurance}</td>
              <td className="px-4 py-2 text-right">{deliveryRequestpackage.data[0].amount_inssurance}</td>
              <td className="px-4 py-2 text-right">{packages.guide_incoming}</td>
              <td className="px-4 py-2 text-right">{deliveryRequestpackage.total}</td>
            </tr>
          
        </tbody>
      </table>
    </div>
       
      </Suspense>
    </>
  );
}
