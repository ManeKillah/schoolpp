import type { PackageStatus } from "../enums";
import type { BaseDto } from "./base";
import type { User } from "./user";

export interface Rental extends BaseDto {
  id: number;
  project_id: number;
  project_name: string;
  equipment_id: number;
  equipment_name: string;
  container_id: number;
  company: string;
  observations: string;
  reference: string;
  start_date: Date;
  end_date: Date;
  status: PackageStatus;
  deletedAt: Date | null;
}

export interface RentalExtended extends Rental {
  user: User | null;
}
