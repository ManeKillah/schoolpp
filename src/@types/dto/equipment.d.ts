import type { PackageStatus } from "../enums";
import type { BaseDto } from "./base";
import type { User } from "./user";

export interface Equipment extends BaseDto {
  id: number;
  project_id: number;
  name: string;
  equipment_id: number;
  store_id: number;
  store_name: string;
  location: string;
  reference_pre: string;
  reference_con: string;
  name: string;
  import: string;
  review_date: Date;
  in_date: Date;
  out_date: Date;
  out_motive: string;
  image_url: string;
  observations: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EquipmentExtended extends Equipment {
  user: User | null;
}
