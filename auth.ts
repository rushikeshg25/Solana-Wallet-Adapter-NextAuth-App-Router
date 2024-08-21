import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/utils/password";
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
        try {
          const signinMessage = new SigninMessage(
            JSON.parse((credentials?.message as string) || "{}")
          );
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL as string);

          if (signinMessage.domain !== nextAuthUrl.host) {
            return null;
          }
          const csrfToken = await getCsrfToken({ req: { ...req, body: null } });

          if (signinMessage.nonce !== csrfToken) {
            return null;
          }
          return {};
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
});
