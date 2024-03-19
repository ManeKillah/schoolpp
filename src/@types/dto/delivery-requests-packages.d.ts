import type { PackageStatus } from "../enums";
import type { BaseDto } from "./base";
import { DeliveryRequest } from "./deliveryRequest";
import type { User } from "./user";

export interface DeliveryRequestsPackages extends BaseDto {
  delivery_request_id: Number;
  package_id: number;
  amount_inssurance: number;
  service_amount_subtotal: number;
  service_amount_tax: number;
  service_amount_inssurance: number;
  service_amount_total: number;
  nationalization_amount_declared: number;
  nationalization_amount_tax: number;
  master_guide_id: number;

  deletedAt: Date | null;
}

export interface DeliveryRequestsPackagesExtended
  extends DeliveryRequestsPackages {
  user: User | null;
  deliveryRequest: DeliveryRequest | null;
}
