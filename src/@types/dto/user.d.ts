import type { BaseDto } from "./base";
import type { UserOtpOperation, UserRole, UserStatus } from "../enums";
export const UserStatus;
export interface User extends BaseDto {
  first_name: string;
  last_name: string;
  email: string;
  image_url: string;
  fileImage?: object;
  phone_country_code?: string | null;
  phone?: string | null;
  deleted_email?: string | null;
  deleted_phone?: string | null;
  role: UserRole;
  status: UserStatus;
  otp_code?: string | null;
  reference?: string | null;
  otp_retries: number;
  otp_expiry?: Date | null;
  otp_operation?: UserOtpOperation | null;
  current_device_os_version: string;
  current_device_brand: string;
  current_codepush_version: string;
  current_device_id: string;
  current_firebase_token: string;
  description: string;
  current_apple_token: string;
  observations: string;
  current_device_make: UserCurrentDeviceMake;
  password: string;
  updatedAt: Date;
}