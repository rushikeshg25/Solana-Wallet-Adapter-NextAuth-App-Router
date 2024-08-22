import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SigninMessage } from "./utils/SigninMessage";
import { getCsrfToken } from "next-auth/react";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Solana",
      credentials: {
        message: {
          label: "Message",
          type: "text",
        },
        signature: {
          label: "Signature",
          type: "text",
        },
      },
      authorize: async (credentials, req) => {
        console.log(credentials);
        console.log(credentials?.message);
        console.log(credentials.signature);
        try {
          const signinMessage = new SigninMessage(
            JSON.parse((credentials?.message as string) || "{}")
          );
          // const nextAuthUrl = new URL(process.env.NEXTAUTH_URL as string);

          // if (signinMessage.domain !== nextAuthUrl.host) {
          //   return null;
          // }
          // const csrfToken = await getCsrfToken();

          // if (signinMessage.nonce !== csrfToken) {
          //   return null;
          // }
          const validationResult = await signinMessage.validate(
            (credentials?.signature as string) || ""
          );

          if (!validationResult)
            throw new Error("Could not validate the signed message");

          return {
            id: signinMessage.publicKey,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.publicKey = token.sub;
      if (session.user) {
        session.user.name = token.sub;
      }
      return session;
    },
  },
});
