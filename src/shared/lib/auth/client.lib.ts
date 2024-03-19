"use client";

import {useSession} from "next-auth/react";

export function useAccessToken(): string {
  const {data} = useSession();

  if (!data) return "";

  return data.data.accessToken;
}
