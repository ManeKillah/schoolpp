import type { BaseDto } from "./base";
import type { ShippingCompany } from "./shippingCompanies"; // Import the ShippingCompany type from your file

interface MasterGuide extends BaseDto {
  reference: string;
  shipping_company_id?: number;
  createdAt: string; // Assuming createdAt is in string format (update the type accordingly)
  updatedAt: string; // Assuming updatedAt is in string format (update the type accordingly)
  deletedAt?: string | null; // Nullable for soft deletes
  shippingCompany?: ShippingCompany; // Assuming you have a ShippingCompany type
}

export default MasterGuide;
