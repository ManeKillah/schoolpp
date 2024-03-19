import type { PackageStatus } from "../enums";
import type { BaseDto } from "./base";
import type { User } from "./user";

export interface Observations extends BaseDto {
  id: number;
  message: string;
  reference: string;
  creation_date: Date;
  // createdAt: Date | null;
  deletedAt: Date | null;
  updatedAt: Date | null;
}

export interface RentalExtended extends Rental {
  user: User | null;
}
