import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import prisma from "./lib/db";

export const { handlers:{GET,POST}, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session:{strategy:"jwt"},
  providers: [
    Credentials({

    })
  ],
});
