import type { PackageStatus, UserStatus } from "../enums";
import type { BaseDto } from "./base";
import type { User } from "./user";

export interface Store extends BaseDto {
  id: number;
  name: string;
  // reference: string;
  store_leader: string;
  store_leader_id: number;
  location: string;
  observations: string;
  description: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface StoreExtended extends Store {
  user: User | null;
}
