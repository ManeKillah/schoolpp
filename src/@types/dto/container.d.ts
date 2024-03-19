import type { PackageStatus, UserStatus } from "../enums";
import type { BaseDto } from "./base";
import type { User } from "./user";

export interface Container extends BaseDto {
  id: number;
  project_id: number;
  equipment_id: number;
  // container_id: number;
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

export interface ContainerExtended extends Container {
  user: User | null;
}
