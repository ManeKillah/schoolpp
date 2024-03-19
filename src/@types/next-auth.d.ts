import type {User} from "@/@types/dto/user";

export interface AuthSession {
  accessToken: string;
  authentication: Authentication;
}

export interface Authentication {
  strategy: string;
  payload: Payload;
}

export interface Payload {
  iat: number;
  exp: number;
  aud: string;
  sub: string;
  jti: string;
}

declare module "next-auth" {
  interface Session {
    user: User;
    data: AuthSession;
  }
}
