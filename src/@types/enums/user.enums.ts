export enum UserRole {
  Superadmin = "superadmin",
  Admin = "admin",
  User = "user",
}

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  PendingVerification = "pending_verification",
  PendingInformation = "pending_information",
}

export enum UserOtpOperation {
  PasswordReset = "password_reset",
  EmailVerification = "email_verification",
  PhoneVerification = "phone_verification",
}

export enum UserCurrentDeviceMake {
  Apple = "apple",
  Android = "android",
}
