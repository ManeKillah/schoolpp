import type { PackageStatus, UserStatus } from "../enums";
import type { BaseDto } from "./base";
import type { User } from "./user";

export interface Village extends BaseDto {
  id: number;
  name: string;
  // reference: string;
  status: UserStatus;
  dane_code: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface VillageExtended extends Village {
  user: User | null;
}
