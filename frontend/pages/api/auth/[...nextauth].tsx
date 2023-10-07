import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import Moralis from "moralis";
import axios from "axios";
import { verifyUser } from "../users";

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "MoralisAuth",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials: any) {
        try {
          // "message" and "signature" are needed for authorization
          // we described them in "credentials" above

          const { message, signature } = credentials;

          // await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API });

          // const { address, profileId } = (
          //   await Moralis.Auth.verify({
          //     message,
          //     signature,
          //     network: "evm",
          //   })
          // ).raw;

          const response = await verifyUser({
            params: {
              message,
              signature,
            },
          });

          if (response?.status === 200) {
            const user = {
              address: response?.data?.address,
              profileId: response?.data?.profileId,
              signature,
            };

            return user;
          }

          // await axios
          //   .get("http://localhost:5001/verifyUser", {
          //     params: { message, signature },
          //   })
          //   .then((response: any) => {
          //     // setWalletBalance(response.data.balance);
          //     console.log("response : ", response);
          //   });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    } as any),
  ],

  // adding user info to the user session object
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      (session as { user: unknown }).user = token.user;
      return session;
    },
  },
});

// import NextAuth from "next-auth";
// import { MoralisNextAuthProvider } from "@moralisweb3/next";

// export default NextAuth({
//   providers: [MoralisNextAuthProvider()],
//   // adding user info to the user session object
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       (session as { user: unknown }).user = token.user;
//       return session;
//     },
//   },
// });
