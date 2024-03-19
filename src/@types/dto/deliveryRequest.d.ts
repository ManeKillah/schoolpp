import type { BaseDto } from "./base";
import type { UserOtpOperation, UserRole, UserStatus } from "../enums";

type DeliveryRequestStatus = "requested" | "in_progress" | "completed";
type PaymentStatus = "pending" | "processing" | "partially_paid" | "paid";

interface DeliveryRequest extends BaseDto {
  delivery_status: DeliveryRequestStatus;
  payment_status: PaymentStatus;
  user_id: number;
  meta_user_first_name: string;
  meta_user_last_name: string;
  warehouse_id: number;
  master_guide_id: number;
  last_mile_guide_id: number;
  last_mile_shipping_company_id: number;
  service_amount_subtotal: number;
  service_amount_tax: number;
  service_amount_inssurance: number;
  service_amount_total: number;
  nationalization_amount_tax: number;
  amount_total: number;
  address_id: number;
  meta_address_line1: string;
  meta_address_line2?: string;
  meta_address_city: string;
  meta_address_country_iso_code: string;
  postal_code?: string;
  meta_address_latitude?: number;
  meta_address_longitude?: number;
  notes?: string;
  private_notes?: string;
  createdAt: string; // Assuming createdAt is in string format (update the type accordingly)
  updatedAt: string; // Assuming updatedAt is in string format (update the type accordingly)
  deletedAt?: string | null; // Nullable for soft deletes
}
