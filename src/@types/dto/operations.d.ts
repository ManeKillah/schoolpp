import type { PackageStatus } from "../enums";
import type { BaseDto } from "./base";
import type { User } from "./user";

export interface Operations extends BaseDto {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  operation: string;
  reference: string;
  operation_date: Date | null;
  // end_date: Date | null;
  status: PackageStatus;
  deletedAt: Date | null;
}

export interface OperationsExtended extends Operations {
  user: User | null;
}
