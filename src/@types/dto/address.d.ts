import type { BaseDto } from "./base";

export interface Address extends BaseDto {
  id: number;
  user_id: number;
  address_line1: string;
  address_line2: string;
  city: string;
  country_iso_code: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  notes: string;
}
