import {getAccessToken} from "@/shared/lib/auth";
import createApi from "@/modules/payment-providers-methods/api";

// import UpdatePackagePageClient from "./page.package";
// import UpdateWarehousePageClient from "./page.warehouse";
import UpdatePaymentProviderMethodPageClient from "./page.PaymentProviderMethod";

export default async function UpdatePaymentProviderMethodPageModal({params: {id}}: {params: {id: string}}) {
  const api = createApi(await getAccessToken());

  const paymentMethod = await (await api).paymentProvidersMethods.get(+id);

  return <UpdatePaymentProviderMethodPageClient paymentMethod={paymentMethod} />;
}
