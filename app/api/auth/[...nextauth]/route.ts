import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from "@prisma/client";
import prisma from "@/app/lib/prisma";
const client = prisma
export const authOptions:AuthOptions = {
  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID!,
    clientSecret: process.env.GOOGLE_SECRET!
  })],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }:any) {
      const dbUser = await client.user.findUnique({
        where: {email: session.user.email}
      });
      if(dbUser)
      {
        session.user.id = dbUser?.id;
      }
      return session;
    },
    async signIn({user}) {
      await client.user.upsert({
        where: {email: user.email!},
        update: {name:user.name, image:user.image},
        create: {
          email:user.email!,
          name:user.name,
          image:user.image
        }
      })
      return true;

    }

  },
  session: {
    strategy: 'jwt'
  },
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}