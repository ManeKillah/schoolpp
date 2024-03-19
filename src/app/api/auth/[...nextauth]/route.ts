import type {NextApiHandler} from "next";

import NextAuth from "next-auth/next";

import {authOptions} from "@/shared/lib/auth";

const handler = NextAuth(authOptions) as NextApiHandler;

export {handler as GET, handler as POST};
