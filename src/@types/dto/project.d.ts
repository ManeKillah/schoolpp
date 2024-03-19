import type { PackageStatus, UserStatus } from "../enums";
import type { BaseDto } from "./base";
import type { User } from "./user";

export interface Project extends BaseDto {
  id: number;
  CIF: number;
  city_id: number;
  country_id: number;
  village_id: number;
  company: string;
  ejecutive: string;
  project_manager: string;
  tean_leader: string;
  project_address: string;
  billis_address: string;
  observations: string;
  dane_code: string;
  operativo: string;
  reference: string;
  descripcion: string;
  name: string;
  start_date: Date;
  billis_start_date: Date;
  billis_end_date: Date;
  end_date: Date;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProjectExtended extends Project {
  user: User | null;
}
