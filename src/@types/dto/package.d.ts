import type { PackageStatus } from "../enums";
import type { BaseDto } from "./base";
import type { User } from "./user";

export interface Package extends BaseDto {
  user_id: number;
  warehouse_id: number;
  sender_name: string;
  guide_incoming: string;
  weight_lb: number;
  height: number;
  width: number;
  length: number;
  special_instructions: string;
  status: PackageStatus;
  status_received_date: string;
  status_shipped_date: string;
  status_delivered_date: string;
  image_path: string;
  deletedAt: Date | null;
}

export interface PackageExtended extends Package {
  user: User | null;
}
