import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { apiClient } from "../api-client";
import { getSession } from "next-auth/react";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        const res = await apiClient.post("/authentication", {
          body: JSON.stringify({ email, password, strategy: "local" }),
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
        return res as any;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      const { user, ...sessionData } = token;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.data = sessionData as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = user as any;

      return session;
    },
  },
};

export async function getAccessToken(context) {
  const session = await getSession(context);

  return session
    ? session.data.accessToken
    : await getServerSession(authOptions).then(
        (res) => res?.data.accessToken ?? null
      );
}
